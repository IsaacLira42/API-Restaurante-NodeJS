import { Router } from "express";
import { ProductsController } from "../controllers/products-controller.js";

const productRoutes = Router();
const productsController = new ProductsController();

productRoutes.get("/", productsController.listAll);
productRoutes.post("/", productsController.create);
productRoutes.put("/:id", productsController.update);
productRoutes.delete("/:id", productsController.remove);

export { productRoutes };