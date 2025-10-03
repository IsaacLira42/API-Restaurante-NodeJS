import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import prisma from "../config/prisma.js";


class TablesController {

    async listAll(req: Request, res: Response, next: NextFunction) {

        try {
            const tables = await prisma.table.findMany();

            return res.json(tables);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_number: z.number().gt(0)
            });

            const { table_number } = bodySchema.parse(req.body);

            const table = prisma.table.create({
                data: {
                    table_number: table_number
                }
            });

            return res.status(201).json(table);

        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const paramSchema = z.object({
                id: z.string().transform(val => parseInt(val))
            });

            const bodySchema = z.object({
                table_number: z.number().gt(0)
            });

            const { id } = paramSchema.parse(req.params);
            const { table_number } = bodySchema.parse(req.body);

            const existingTable = await prisma.table.findFirst({
                where: {
                    table_number: table_number,
                    id: { not: id }
                }
            });

            if (existingTable) {
                return res.status(400).json({
                    error: `Já existe uma mesa com o número ${table_number}`
                });
            }

            const table = await prisma.table.update({
                where: { id: id },
                data: { table_number: table_number }
            });

            return res.status(200).json(table);

        } catch (error) {
            next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const paramSchema = z.object({
                id: z.string().transform(val => parseInt(val))
            });

            const { id } = paramSchema.parse(req.params);

            const table = await prisma.table.delete({
                where: {
                    id: id
                }
            });

            return res.status(200).json(table);
        } catch (error) {
            next(error);
        }


    }

}

export { TablesController }