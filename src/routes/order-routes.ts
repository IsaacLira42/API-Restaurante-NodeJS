import { Router } from "express";
import { OrderController } from "../controllers/order-controller.js";

const orderRouter = Router();
const orderController = new OrderController();


orderRouter.get("/", orderController.listAll);
orderRouter.get("/:id", orderController.listForId);
orderRouter.get("/session-table/:table_session_id", orderController.listByTableSession);
orderRouter.post("/", orderController.create);


export { orderRouter }