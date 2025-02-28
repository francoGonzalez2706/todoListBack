import express from "express";
import sprintModel from "../models/sprint.model.js";
import { getSprintById } from "../controlers/sprint.controler.js";
import taskModel from "../models/task.model.js";

export const sprintRouter = express.Router();

sprintRouter.get("/", async (req, res) => {
  try {
    const sprint = await sprintModel.find().populate("tareas");
    res.json(sprint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sprintRouter.post("/", async (req, res) => {
  try {
    const { fechaInicio, fechaCierre, tareas, color } = req.body;
    if ((!fechaInicio, !fechaCierre, !tareas)) {
      return res.status(400).message({
        message: "Los parametros, fecha inicio, fecha cierre, tarea",
      });
    }
    const newSprint = new sprintModel({
      fechaInicio,
      fechaCierre,
      tareas,
      color,
    });
    const sprint = await sprintModel.create(newSprint);
    res.status(201).json(sprint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
sprintRouter.get("/getSprintById", getSprintById, async (req, res) => {
  return res.json(res.sprint);
});

sprintRouter.post("/addTaskToSprint", getSprintById, async (req, res) => {
  const { taskId } = req.query;
  try {
    if (!res.sprint) {
      return res.status(500).json({ message: "No hay un sprint" });
    }
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.sprint.tareas.push(task);
    await res.sprint.save();
    return res
      .status(200)
      .json({ message: "Tarea agregada al backlog", task: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al agregar la tarea al sprint", error });
  }
});
