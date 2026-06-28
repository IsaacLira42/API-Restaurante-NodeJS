import prisma from "../config/prisma.js";
import { TableSession } from "@prisma/client";

export interface CreateTableSessionDTO {
    tableId: number;
}

export class TablesSessionsRepository {
    async findAll(): Promise<TableSession[]> {
        return prisma.tableSession.findMany({
            include: {
                table: true
            }
        });
    }

    async findById(id: number): Promise<TableSession | null> {
        return prisma.tableSession.findUnique({
            where: { id },
            include: { table: true }
        });
    }

    async findOpenByTableId(tableId: number): Promise<TableSession | null> {
        return prisma.tableSession.findFirst({
            where: {
                tableId,
                closed_at: null
            }
        });
    }

    async create(data: CreateTableSessionDTO): Promise<TableSession> {
        return prisma.tableSession.create({
            data: {
                tableId: data.tableId
            },
            include: {
                table: true
            }
        });
    }

    async close(id: number): Promise<TableSession> {
        return prisma.tableSession.update({
            where: { id },
            data: {
                closed_at: new Date()
            }
        });
    }
}
