import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { OrderService } from "../services/order-service.js";

class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    listAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await this.orderService.listAll();
            return res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    listForId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const paramsSchema = z.object({
                id: z.string().transform(val => parseInt(val))
            });

            const { id } = paramsSchema.parse(req.params);
            const order = await this.orderService.listById(id);

            return res.json(order);
        } catch (error) {
            next(error);
        }
    }

    listByTableSession = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const paramsSchema = z.object({
                table_session_id: z.string().transform(val => parseInt(val))
            });

            const { table_session_id } = paramsSchema.parse(req.params);
            const orders = await this.orderService.listByTableSession(table_session_id);

            return res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bodySchema = z.object({
                quantity: z.number().int().positive(),
                price: z.number().positive(),
                productId: z.number().int().positive(),
                tableSessionId: z.number().int().positive(),
            });

            const data = bodySchema.parse(req.body);
            const order = await this.orderService.create(data);

            return res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    }
}

export { OrderController };