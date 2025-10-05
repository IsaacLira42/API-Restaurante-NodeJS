import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma.js";
import { z } from "zod";
import { AppError } from "../utils/AppError.js";

class OrderController {
    async listAll(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await prisma.order.findMany({
                include: {
                    product: true,
                    tableSession: {
                        include: { table: true },
                    },
                },
            });

            const ordersWithTotal = orders.map(order => ({
                ...order,
                total: order.quantity * order.price
            }));

            return res.json(ordersWithTotal);
        } catch (error) {
            next(error);
        }
    }

    async listForId(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsSchema = z.object({
                id: z.string().transform(val => parseInt(val))
            });

            const { id } = paramsSchema.parse(req.params);

            const order = await prisma.order.findFirst({
                where: { id },
                include: {
                    product: true,
                    tableSession: {
                        include: { table: true },
                    },
                },
            });

            if (!order) {
                throw new AppError(`Pedido com ID ${id} não encontrado`, 404);
            }

            const orderWithTotal = {
                ...order,
                total: order.quantity * order.price
            };

            return res.json(orderWithTotal);
        } catch (error) {
            next(error);
        }
    }

    async listByTableSession(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsSchema = z.object({
                table_session_id: z.string().transform(val => parseInt(val))
            });

            const { table_session_id } = paramsSchema.parse(req.params);

            const orders = await prisma.order.findMany({
                where: { tableSessionId: table_session_id },
                include: {
                    product: true,
                    tableSession: {
                        include: { table: true },
                    },
                },
            });

            if (orders.length === 0) {
                throw new AppError(`Nenhum pedido encontrado para a sessão de mesa com ID ${table_session_id}`, 404);
            }

            const ordersWithTotal = orders.map(order => ({
                ...order,
                total: order.quantity * order.price
            }));

            return res.json(ordersWithTotal);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                quantity: z.number().int().positive(),
                price: z.number().positive(),
                productId: z.number().int().positive(),
                tableSessionId: z.number().int().positive(),
            });

            const data = bodySchema.parse(req.body);

            const product = await prisma.product.findUnique({
                where: { id: data.productId }
            });

            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            const tableSession = await prisma.tableSession.findUnique({
                where: { id: data.tableSessionId }
            });

            if (!tableSession) {
                return res.status(404).json({ error: "Table session not found" });
            }

            const order = await prisma.order.create({
                data: {
                    quantity: data.quantity,
                    price: data.price,
                    product: { connect: { id: data.productId } },
                    tableSession: { connect: { id: data.tableSessionId } },
                },
                include: {
                    product: true,
                    tableSession: true,
                },
            });

            const orderWithTotal = {
                ...order,
                total: order.quantity * order.price
            };

            return res.status(201).json(orderWithTotal);
        } catch (error) {
            next(error);
        }
    }
}

export { OrderController }