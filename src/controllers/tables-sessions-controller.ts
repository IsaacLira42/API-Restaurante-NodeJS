import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import prisma from "../config/prisma.js";


class TablesSessionsController {

    async listAll(req: Request, res: Response, next: NextFunction) {
        try {
            const tablesSessions = await prisma.tableSession.findMany({
                include: {
                    table: true
                }
            });

            return res.json(tablesSessions);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                tableId: z.number()
            });

            const { tableId } = bodySchema.parse(req.body);

            const tableExists = await prisma.table.findUnique({
                where: { id: tableId }
            });

            if (!tableExists) {
                return res.status(404).json({ error: "Mesa não encontrada" });
            }

            const existingSession = await prisma.tableSession.findFirst({
                where: {
                    tableId: tableId,
                    closed_at: null
                }
            });

            if (existingSession) {
                return res.status(400).json({ error: "Já existe uma sessão aberta para esta mesa" });
            }

            const tableSession = await prisma.tableSession.create({
                data: {
                    tableId: tableId
                },
                include: {
                    table: true
                }
            });

            return res.status(201).json(tableSession);
        } catch (error) {
            next(error);
        }
    }

    async close(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const tableSession = await prisma.tableSession.update({
                where: { id: parseInt(id) },
                data: {
                    closed_at: new Date()
                }
            });

            return res.json(tableSession);
        } catch (error) {
            next(error);
        }
    }
}

export { TablesSessionsController }