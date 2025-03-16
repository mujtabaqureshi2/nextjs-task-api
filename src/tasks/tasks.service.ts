import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.model';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
  
    private readonly tasksRepository: TaskRepository) {}
   async getTasks(filterDto:GetTasksFilterDto):Promise<Task[]>{
    return this.tasksRepository.getTasks(filterDto)
   }

  async getTaskByID(id: string): Promise<Task> {
    return this.tasksRepository.findOne(id)
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    return this.tasksRepository.createTask(title, description, TaskStatus.OPEN);
  }

  async deleteTask(id:string):Promise<void>{
    return this.tasksRepository.removeOne(id)
  }

  async updateTaskStatus(id:string, status:TaskStatus):Promise<Task>{
         return this.tasksRepository.updateTask(id,status)
  }
}
