import taskModel from "../models/task.model.js";

export const getBookById = async (req, res, next) => {
  let task;
  const { id } = req.query;

  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "el id de la tarea no es valido" });
  }

  try {
    task = await taskModel.findById(id);

    if (!task) {
      return res
        .status(404)
        .json({ message: "no se encontro una tarea con ese id" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.task = task;
  next();
};
