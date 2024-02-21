import { Request, Response } from "express";
import { taskSchema } from "../validators/taskValidator";
import { taskRepository } from "../repositories/taskRepository";
import { DeepPartial } from "typeorm";

export class TaskController {
  async createTask(req: Request, res: Response) {
    try {
      const { title, description, status } = req.body;

      const createdAt = new Date();

      const newTask = taskRepository.create({
        title,
        description,
        status,
        createdAt, 
      });

      const savedTask = await taskRepository.save(newTask);

      res.status(201).json(savedTask);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await taskRepository.find();
      res.json(tasks);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      res.status(500).json({ error: error });
    }
  }
  async getTaskById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const task = await taskRepository.findOneBy({ id: id });
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ message: "Tarefa não encontrada!" });
      }
    } catch (error) {
      console.error("Erro ao buscar tarefa:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const dataToUpdate: DeepPartial<typeof taskSchema> = taskSchema.parse(
        req.body
      );
      const updatedTask = await taskRepository.save({
        id: id,
        ...dataToUpdate,
      });
      res.json(updatedTask);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      res.status(400).json({ error: error });
    }
  }

  async updateTaskStatus(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      const task = await taskRepository.findOneBy({ id: id });

      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada!" });
      }

      if (status === "completed" && !task.finishedAt) {
        task.finishedAt = new Date();
      }

    
      task.status = status;

      const updatedTask = await taskRepository.save(task);
      res.json(updatedTask);
    } catch (error) {
      console.error("Erro ao atualizar status de tarefa:", error);
      res.status(400).json({ error: error });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await taskRepository.delete(id);
      res.status(200).json({ message: "Tarefa deletada com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      res.status(500).json({ error: error });
    }
  }
}
