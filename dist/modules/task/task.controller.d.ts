import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto, user: any): Promise<any>;
    findAll(projectId: string, columnId: string, user: any): Promise<any[]>;
    findOne(id: string, user: any): Promise<any>;
    update(id: string, updateTaskDto: UpdateTaskDto, user: any): Promise<any>;
    move(id: string, moveTaskDto: MoveTaskDto, user: any): Promise<any>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
