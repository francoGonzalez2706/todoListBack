import sprintModel from "../models/sprint.model.js";

export const getSprintById = async (req, res, next) => {
  let sprint;
  const { idSprint } = req.query;

  if (!idSprint || !idSprint.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "el id de la tarea no es valido" });
  }

  try {
    sprint = await sprintModel.findById(idSprint).populate("tareas");

    if (!sprint) {
      return res
        .status(404)
        .json({ message: "no se encontro una tarea con ese id" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.sprint = sprint;
  next();
};
