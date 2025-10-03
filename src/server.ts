import express from "express";
import { routes } from "./routes/index.js";
import { errorHandling } from "./middlewares/error-handling.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(routes);

app.use(errorHandling);

app.listen(PORT, () => console.log(`App listening on ${PORT}`));
