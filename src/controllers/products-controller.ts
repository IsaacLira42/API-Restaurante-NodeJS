import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma.js";
import { z } from "zod";

class ProductsController {
    async listAll(req: Request, res: Response, next: NextFunction) {
        try {
            const querySchema = z.object({
                search: z.string().optional().transform(val => val?.trim())
            });

            const { search } = querySchema.parse(req.query);

            const products = await prisma.product.findMany({
                where: search ? {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    }
                } : {},
                orderBy: {
                    created_at: 'desc'
                }
            });

            return res.json(products);

        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0),
            });

            const { name, price } = bodySchema.parse(req.body);

            const product = await prisma.product.create({
                data: {
                    name: name,
                    price: price
                }
            });

            return res.status(201).json(product)

        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsSchema = z.object({
                id: z.string().transform(val => parseInt(val))
            });

            const bodySchema = z.object({
                name: z.string().trim().min(6).optional(),
                price: z.number().gt(0).optional(),
            }).refine(data => data.name || data.price, {
                message: "Pelo menos um campo deve ser fornecido para atualização"
            });

            const { id } = paramsSchema.parse(req.params);
            const updateData = bodySchema.parse(req.body);

            const product = await prisma.product.update({
                where: {
                    id: id
                },
                data: updateData
            });

            return res.json(product);

        } catch (error) {
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const paramsSchema = z.object({
                id: z.string().transform(val => parseInt(val))
            });

            const { id } = paramsSchema.parse(req.params);

            const produto = await prisma.product.delete({
                where: {
                    id: id
                }
            });

            return res.status(200).json(produto);
        } catch (error) {
            next(error);
        }
    }
}

export { ProductsController }