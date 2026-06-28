import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { TablesService } from "../services/tables-service.js";

class TablesController {
    private tablesService: TablesService;

    constructor() {
        this.tablesService = new TablesService();
    }

    listAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tables = await this.tablesService.listAll();
            return res.json(tables);
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bodySchema = z.object({
                table_number: z.number().gt(0)
            });

            const { table_number } = bodySchema.parse(req.body);
            const table = await this.tablesService.create({ table_number });

            return res.status(201).json(table);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const paramSchema = z.object({
                id: z.string().transform(val => parseInt(val))
            });

            const bodySchema = z.object({
                table_number: z.number().gt(0)
            });

            const { id } = paramSchema.parse(req.params);
            const { table_number } = bodySchema.parse(req.body);

            const table = await this.tablesService.update(id, { table_number });
            return res.status(200).json(table);
        } catch (error) {
            next(error);
        }
    }

    remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const paramSchema = z.object({
                id: z.string().transform(val => parseInt(val))
            });

            const { id } = paramSchema.parse(req.params);
            const table = await this.tablesService.remove(id);

            return res.status(200).json(table);
        } catch (error) {
            next(error);
        }
    }
}

export { TablesController };