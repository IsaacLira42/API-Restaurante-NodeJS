import { ProductsRepository, CreateProductDTO, UpdateProductDTO } from "../repositories/products-repository.js";
import { AppError } from "../utils/AppError.js";

export class ProductsService {
    private productsRepository: ProductsRepository;

    constructor() {
        this.productsRepository = new ProductsRepository();
    }

    async listAll(search?: string) {
        return this.productsRepository.findAll(search);
    }

    async create(data: CreateProductDTO) {
        return this.productsRepository.create(data);
    }

    async update(id: number, data: UpdateProductDTO) {
        const productExists = await this.productsRepository.findById(id);
        if (!productExists) {
            throw new AppError("Produto não encontrado", 404);
        }

        return this.productsRepository.update(id, data);
    }

    async remove(id: number) {
        const productExists = await this.productsRepository.findById(id);
        if (!productExists) {
            throw new AppError("Produto não encontrado", 404);
        }

        return this.productsRepository.delete(id);
    }
}
