import { Types } from 'mongoose';
export interface TaskData {
    title: string;
    description?: string;
    columnId: Types.ObjectId;
    projectId: Types.ObjectId;
    order: number;
    createdBy: string;
    updatedBy: string;
}
export declare class TaskFactory {
    static createTask(data: Partial<TaskData>): TaskData;
    static createTaskFromTemplate(template: string, columnId: Types.ObjectId, projectId: Types.ObjectId, order: number, userEmail: string): TaskData;
}
