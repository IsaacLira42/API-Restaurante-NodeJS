import { Router } from "express";
import { TablesSessionsController } from "../controllers/tables-sessions-controller.js";

const tablesSessios = Router();
const tablesSessionsController = new TablesSessionsController();


tablesSessios.get("/", tablesSessionsController.listAll);
tablesSessios.post("/", tablesSessionsController.create);
tablesSessios.patch("/:id/close", tablesSessionsController.close);


export { tablesSessios }