import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Put, 
    HttpCode 
} from '@nestjs/common';
import { TaskService } from './shared/task.service';
import { Task } from './shared/task';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async getAll(): Promise<Task[]> {
        return await this.taskService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Task> {
        return await this.taskService.getById(id);
    }

    @Post()
    async create(@Body() task: Task): Promise<Task> {
        return await this.taskService.create(task);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() task: Task): Promise<Task> {
        return await this.taskService.update(id, task);
    }

    @Delete(':id')
    @HttpCode(204) // Retorna status 204 No Content
    async delete(@Param('id') id: string): Promise<void> {
        await this.taskService.delete(id);
    }
}
