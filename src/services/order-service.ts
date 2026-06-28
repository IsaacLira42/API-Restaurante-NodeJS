import { OrderRepository, CreateOrderDTO } from "../repositories/order-repository.js";
import { ProductsRepository } from "../repositories/products-repository.js";
import { TablesSessionsRepository } from "../repositories/tables-sessions-repository.js";
import { AppError } from "../utils/AppError.js";
import { calculateOrderTotal } from "../utils/calculator.js";

export class OrderService {
    private orderRepository: OrderRepository;
    private productsRepository: ProductsRepository;
    private tablesSessionsRepository: TablesSessionsRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
        this.productsRepository = new ProductsRepository();
        this.tablesSessionsRepository = new TablesSessionsRepository();
    }

    async listAll() {
        const orders = await this.orderRepository.findAll();
        return orders.map(order => ({
            ...order,
            total: calculateOrderTotal(order.price, order.quantity)
        }));
    }

    async listById(id: number) {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new AppError(`Pedido com ID ${id} não encontrado`, 404);
        }

        return {
            ...order,
            total: calculateOrderTotal(order.price, order.quantity)
        };
    }

    async listByTableSession(tableSessionId: number) {
        const sessionExists = await this.tablesSessionsRepository.findById(tableSessionId);
        if (!sessionExists) {
            throw new AppError(`Sessão de mesa com ID ${tableSessionId} não encontrada`, 404);
        }

        const orders = await this.orderRepository.findByTableSessionId(tableSessionId);
        if (orders.length === 0) {
            throw new AppError(`Nenhum pedido encontrado para a sessão de mesa com ID ${tableSessionId}`, 404);
        }

        return orders.map(order => ({
            ...order,
            total: calculateOrderTotal(order.price, order.quantity)
        }));
    }

    async create(data: CreateOrderDTO) {
        const product = await this.productsRepository.findById(data.productId);
        if (!product) {
            throw new AppError("Produto não encontrado", 404);
        }

        const tableSession = await this.tablesSessionsRepository.findById(data.tableSessionId);
        if (!tableSession) {
            throw new AppError("Sessão de mesa não encontrada", 404);
        }

        if (tableSession.closed_at !== null) {
            throw new AppError("Não é possível adicionar pedidos a uma sessão de mesa encerrada", 400);
        }

        const order = await this.orderRepository.create(data);
        return {
            ...order,
            total: calculateOrderTotal(order.price, order.quantity)
        };
    }
}
