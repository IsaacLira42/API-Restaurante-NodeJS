import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ProductsService } from "../services/products-service.js";

class ProductsController {
    private productsService: ProductsService;

    constructor() {
        this.productsService = new ProductsService();
    }

    listAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const querySchema = z.object({
                search: z.string().optional().transform(val => val?.trim())
            });

            const { search } = querySchema.parse(req.query);
            const products = await this.productsService.listAll(search);

            return res.json(products);
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0),
            });

            const { name, price } = bodySchema.parse(req.body);
            const product = await this.productsService.create({ name, price });

            return res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
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

            const product = await this.productsService.update(id, updateData);

            return res.json(product);
        } catch (error) {
            next(error);
        }
    }

    remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const paramsSchema = z.object({
                id: z.string().transform(val => parseInt(val))
            });

            const { id } = paramsSchema.parse(req.params);
            const product = await this.productsService.remove(id);

            return res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }
}

export { ProductsController };