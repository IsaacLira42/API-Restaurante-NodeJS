import prisma from "../config/prisma.js";
import { Order } from "@prisma/client";

export interface CreateOrderDTO {
    quantity: number;
    price: number;
    productId: number;
    tableSessionId: number;
}

export class OrderRepository {
    async findAll() {
        return prisma.order.findMany({
            include: {
                product: true,
                tableSession: {
                    include: { table: true },
                },
            },
        });
    }

    async findById(id: number) {
        return prisma.order.findFirst({
            where: { id },
            include: {
                product: true,
                tableSession: {
                    include: { table: true },
                },
            },
        });
    }

    async findByTableSessionId(tableSessionId: number) {
        return prisma.order.findMany({
            where: { tableSessionId },
            include: {
                product: true,
                tableSession: {
                    include: { table: true },
                },
            },
        });
    }

    async create(data: CreateOrderDTO) {
        return prisma.order.create({
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
    }
}
