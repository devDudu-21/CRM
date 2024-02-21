import { AppDataSource } from "../data-source";
import { Task } from "../models/Task";

export const taskRepository = AppDataSource.getRepository(Task);
