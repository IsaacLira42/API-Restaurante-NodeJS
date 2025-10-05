import { Router } from "express";
import { TablesController } from "../controllers/tables-controller.js";


const tablesRoutes = Router();
const tablesController = new TablesController();


tablesRoutes.get("/", tablesController.listAll);
tablesRoutes.post("/", tablesController.create);
tablesRoutes.put("/:id", tablesController.update);
tablesRoutes.delete("/:id", tablesController.remove);


export { tablesRoutes }