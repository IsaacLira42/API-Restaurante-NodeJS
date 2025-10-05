import { Router } from "express";
import { productRoutes } from "./products-routes.js";
import { tablesRoutes } from "./tables-routes.js";
import { tablesSessios } from "./tables-sessions-routes.js";
import { orderRouter } from "./order-routes.js"


const routes = Router();


routes.use("/products", productRoutes);
routes.use("/tables", tablesRoutes);
routes.use("/table-sessions", tablesSessios);
routes.use("/orders", orderRouter)


export { routes }