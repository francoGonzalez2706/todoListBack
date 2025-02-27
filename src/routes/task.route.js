import express from "express";
import taskModel from "../models/task.model.js";
import { getBookById } from "../controlers/task.controler.js";

export const taskRouter = express.Router();

taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await taskModel.find();
    if (tasks.length === 0) {
      res.status(204).json([]);
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

taskRouter.post("/", async (req, res) => {
  const { titulo, descripcion, estado, fechaLimite, color } = req?.body;
  if (!titulo || !estado || !fechaLimite) {
    return res
      .status(400)
      .json({ message: "los campos titulo, estado y fecha son obligatorios" });
  }
  const task = new taskModel({
    titulo,
    descripcion,
    estado,
    fechaLimite,
    color,
  });
  try {
    const newBook = await taskModel.create(task);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

taskRouter.get("/getOneById", getBookById, async (req, res) => {
  res.json(res.task);
});

taskRouter.put("/updateById", getBookById, async (req, res) => {
  try {
    let task = res.task;

    task.titulo = req.body.titulo || task.titulo;
    task.descripcion = req.body.descripcion || task.descripcion;
    task.estado = req.body.estado || task.estado;
    task.fechaLimite = req.body.fechaLimite || task.fechaLimite;
    task.color = req.body.color || task.color;

    const taskUpdated = await task.save();
    res.json(taskUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

taskRouter.delete("/", getBookById, async (req, res) => {
  try {
    let task = res.task;
    const taskDeleted = await task.remove();
    res.json(taskDeleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
