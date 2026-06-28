import prisma from "../config/prisma.js";
import { Table } from "@prisma/client";

export interface CreateTableDTO {
    table_number: number;
}

export interface UpdateTableDTO {
    table_number: number;
}

export class TablesRepository {
    async findAll(): Promise<Table[]> {
        return prisma.table.findMany();
    }

    async findById(id: number): Promise<Table | null> {
        return prisma.table.findUnique({
            where: { id }
        });
    }

    async findByNumber(table_number: number): Promise<Table | null> {
        return prisma.table.findUnique({
            where: { table_number }
        });
    }

    async findAnotherWithNumber(table_number: number, excludeId: number): Promise<Table | null> {
        return prisma.table.findFirst({
            where: {
                table_number,
                id: { not: excludeId }
            }
        });
    }

    async create(data: CreateTableDTO): Promise<Table> {
        return prisma.table.create({
            data
        });
    }

    async update(id: number, data: UpdateTableDTO): Promise<Table> {
        return prisma.table.update({
            where: { id },
            data
        });
    }

    async delete(id: number): Promise<Table> {
        return prisma.table.delete({
            where: { id }
        });
    }
}
