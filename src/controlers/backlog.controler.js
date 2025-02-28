import backlogModel from "../models/backlog.model.js";

export async function getExistingBacklog() {
  try {
    const existingBacklog = await backlogModel.findOne();
    if (!existingBacklog) {
      const newBacklog = new backlogModel({
        tareas: [],
      });
      await newBacklog.save();
      console.log("Backlog predeterminado creado");
      return newBacklog;
    } else {
      return existingBacklog;
    }
  } catch (error) {
    console.error("Error al verificar o crear el backlog:", error);
  }
}
