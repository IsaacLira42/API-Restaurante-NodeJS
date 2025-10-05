import { Router } from "express";
import { productRoutes } from "./products-routes.js";
import { tablesRoutes } from "./tables-routes.js";
import { tablesSessios } from "./tables-sessions-routes.js";


const routes = Router();


routes.use("/products", productRoutes);
routes.use("/tables", tablesRoutes);
routes.use("/table-sessions", tablesSessios);

export { routes }