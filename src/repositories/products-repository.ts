import prisma from "../config/prisma.js";
import { Product } from "@prisma/client";

export interface CreateProductDTO {
    name: string;
    price: number;
}

export interface UpdateProductDTO {
    name?: string;
    price?: number;
}

export class ProductsRepository {
    async findAll(search?: string): Promise<Product[]> {
        return prisma.product.findMany({
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
    }

    async findById(id: number): Promise<Product | null> {
        return prisma.product.findUnique({
            where: { id }
        });
    }

    async create(data: CreateProductDTO): Promise<Product> {
        return prisma.product.create({
            data
        });
    }

    async update(id: number, data: UpdateProductDTO): Promise<Product> {
        return prisma.product.update({
            where: { id },
            data
        });
    }

    async delete(id: number): Promise<Product> {
        return prisma.product.delete({
            where: { id }
        });
    }
}
