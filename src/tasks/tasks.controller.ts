import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {

    }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        // if we have any filters defined, call tasksService.getTasksWithFilters
        // otherwse, just get all tasks
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto)
        }else {
            return this.tasksService.getAllTasks()
        }
        
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Task {
    return this.tasksService.getTaskById(id)
    }

    @Delete('/:id')
        deleteTask(@Param('id') id:string):void {
            return this.tasksService.deleteTask(id)
        }
    

    @Post()
    createTask(

      @Body( )  createTaskDto: CreateTaskDto
    ) :Task{
        return this.tasksService.createTask(createTaskDto)
}

    @Patch('/:id/status')
     updateTaskStatus(@Param('id') id:string, @Body('status') status:TaskStatus): Task{
          return this.tasksService.updateTaskStatus(id, status)
     }

}