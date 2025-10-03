import { Router } from "express";
import { TablesController } from "../controllers/tables-controller.js";


const tablesRoutes = Router();
const tablesController = new TablesController();


tablesRoutes.use("/", tablesController.listAll);
tablesRoutes.use("/", tablesController.create);
tablesRoutes.use("/:id", tablesController.update);
tablesRoutes.use("/:id", tablesController.remove);


export { tablesRoutes }