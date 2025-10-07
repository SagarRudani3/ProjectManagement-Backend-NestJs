import { Model } from "mongoose";
import { Task } from "../../database/schemas/task.schema";
import { Column } from "../../database/schemas/column.schema";
import { Activity } from "../../database/schemas/activity.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { MoveTaskDto } from "./dto/move-task.dto";
import { EventsGateway } from "../../gateways/events.gateway";
export declare class TaskService {
    private taskModel;
    private columnModel;
    private activityModel;
    private eventsGateway;
    constructor(taskModel: Model<Task>, columnModel: Model<Column>, activityModel: Model<Activity>, eventsGateway: EventsGateway);
    create(createTaskDto: CreateTaskDto, userEmail: string, isSuperUser: boolean): Promise<any>;
    findAll(projectId: string, isSuperUser: boolean): Promise<any[]>;
    findByColumn(columnId: string, isSuperUser: boolean): Promise<any[]>;
    findOne(id: string, isSuperUser: boolean): Promise<any>;
    update(id: string, updateTaskDto: UpdateTaskDto, userEmail: string, isSuperUser: boolean): Promise<any>;
    move(id: string, moveTaskDto: MoveTaskDto, userEmail: string, isSuperUser: boolean): Promise<any>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    private formatTask;
}
