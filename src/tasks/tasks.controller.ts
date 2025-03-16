import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

        @Get()
        getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
                return this.tasksService.getTasks(filterDto)

        }



    @Get('/:id')
    getTaskbyID(@Param('id') id: string): Promise<Task> {
        console.log('Im claaded by ', id)
        return this.tasksService.getTaskByID(id)
    }

        @Delete('/:id')
            deleteTask(@Param('id') id:string):Promise<void> {
                return this.tasksService.deleteTask(id)
            }


    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }

        @Patch('/:id/status')
         updateTaskStatus(@Param('id') id:string, @Body('status') status:TaskStatus): Promise<Task>{
              return this.tasksService.updateTaskStatus(id, status)
         }

}