import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskStatus } from "./tasks.model";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>
  ) {}

  async getTasks(filterDto:GetTasksFilterDto):Promise<Task[]>{
    const {status, search} = filterDto;
   const query = this.repository.createQueryBuilder('task');
     
   if(status){
    query.andWhere('task.status = :status', {status} )
   }

   if(search){
    query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {search: `%${search}`},
    ) ;

   }
   const tasks = await query.getMany();
   return tasks
  }
  async createTask(title: string, description: string, status:TaskStatus): Promise<Task> {
    const task = this.repository.create({ title, description,status });
    return this.repository.save(task);
  }

  async findOne(id: string): Promise<Task> {
    const found = await this.repository.findOne({ where: { id } });
    if(!found){
        throw new NotFoundException(`Task with ${id} Not Found`)
    }

    return found
  }

  async removeOne(id:string):Promise<void>{
     const result = await this.repository.delete(id)
     if(!result?.affected){
        throw new NotFoundException(`Task with ${id} not found`)
     } 
  }

  async updateTask(id:string, status:TaskStatus){
    const task = await this.findOne(id);

    task.status = status;
    await this.repository.save(task)

    return task
  }
}
