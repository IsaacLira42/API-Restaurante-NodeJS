import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { TablesSessionsService } from "../services/tables-sessions-service.js";

class TablesSessionsController {
    private tablesSessionsService: TablesSessionsService;

    constructor() {
        this.tablesSessionsService = new TablesSessionsService();
    }

    listAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tablesSessions = await this.tablesSessionsService.listAll();
            return res.json(tablesSessions);
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bodySchema = z.object({
                tableId: z.number()
            });

            const { tableId } = bodySchema.parse(req.body);
            const tableSession = await this.tablesSessionsService.create({ tableId });

            return res.status(201).json(tableSession);
        } catch (error) {
            next(error);
        }
    }

    close = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const paramsSchema = z.object({
                id: z.string().transform(val => parseInt(val))
            });

            const { id } = paramsSchema.parse(req.params);
            const tableSession = await this.tablesSessionsService.close(id);

            return res.json(tableSession);
        } catch (error) {
            next(error);
        }
    }
}

export { TablesSessionsController };