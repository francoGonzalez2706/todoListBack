import { config } from "dotenv";

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { taskRouter } from "./routes/task.route.js";
import { backlogRouter } from "./routes/backlog.route.js";
import { getExistingBacklog } from "./controlers/backlog.controler.js";
import { sprintRouter } from "./routes/sprint.route.js";
config();

//express
const app = express();
//parseador de bodies
app.use(bodyParser.json());
getExistingBacklog();
//conectamos la bbdd
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });

const db = mongoose.connection;

app.use("/task", taskRouter);
app.use("/backlog", backlogRouter);
app.use("/sprint", sprintRouter);
//montaje de la app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("servidor iniciado en el puerto", port);
});
