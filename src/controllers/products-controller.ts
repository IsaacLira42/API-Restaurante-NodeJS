import { NextFunction, Request, Response } from "express";

class ProductsController {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json({ message: "OK Coleguinha" });
        } catch (error) {
            next(error);
        }
    }
}

export { ProductsController }