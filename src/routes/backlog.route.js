import express from "express";
import backlogSchema from "../models/backlog.model.js";
import { getExistingBacklog } from "../controlers/backlog.controler.js";
import taskModel from "../models/task.model.js";

export const backlogRouter = express.Router();

backlogRouter.get("/", async (req, res) => {
  try {
    const backlog = await backlogSchema.findOne().populate("tareas");
    res.json(backlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

backlogRouter.post("/addTaskBacklog", async (req, res) => {
  const { taskId } = req.query;

  try {
    const backlog = await getExistingBacklog();
    if (!backlog) {
      return res.status(500).json({ message: "No hay un backlog" });
    }
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    backlog.tareas.push(task);

    await backlog.save();
    return res
      .status(200)
      .json({ message: "Tarea agregada al backlog", task: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al agregar la tarea al backlog", error });
  }
});
