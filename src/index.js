import { config } from "dotenv";

import express from "express";
import mongoose from "mongoose";
import { taskRouter } from "./routes/task.route.js";
import bodyParser from "body-parser";
config();

//express
const app = express();
//parseador de bodies
app.use(bodyParser.json());

//conectamos la bbdd
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
mongoose.set("strictQuery", true);
const db = mongoose.connection;

app.use("/task", taskRouter);

//montaje de la app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("servidor iniciado en el puerto", port);
});
