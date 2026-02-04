import express from "express";
import routes from "./routes";

import { errorHandler } from "./middlewares/error";

export const app = express();

app.use(express.json());
app.get("/health", (_, res) => res.json({ ok: true }));

app.use(routes);
app.use(errorHandler);
export default app;