import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
  ) {}

  async getAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return task;
  }

  async create(task: Task): Promise<Task> {
    const createdTask = new this.taskModel(task);
    return createdTask.save();
  }

  async update(id: string, task: Task): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, task, {
      new: true, // Retorna a versão atualizada
    }).exec();

    if (!updatedTask) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada para atualização`);
    }
    return updatedTask;
  }

  async delete(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada para exclusão`);
    }
  }
}
