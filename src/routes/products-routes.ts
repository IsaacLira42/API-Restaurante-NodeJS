import { Router } from "express";
import { ProductsController } from "../controllers/products-controller.js";

const productRoutes = Router();
const productsController = new ProductsController();

productRoutes.get("/", productsController.index);

export { productRoutes };