import Express from "express";
import cors from "cors";
import dotenv from "dotenv";

import appRouter from "./router/index";
import { connectDb } from "./model/db";
import { config } from "./config";
dotenv.config();
const app = Express();
app.use(cors());
connectDb();

app.use("/api", appRouter);

app.listen(config.port, () => {
  console.log("Server is running on port 3000");
});
