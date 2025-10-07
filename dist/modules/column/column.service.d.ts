import { Model } from 'mongoose';
import { Column } from '../../database/schemas/column.schema';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Task } from '../../database/schemas/task.schema';
export declare class ColumnService {
    private columnModel;
    private taskModel;
    constructor(columnModel: Model<Column>, taskModel: Model<Task>);
    create(createColumnDto: CreateColumnDto, userEmail: string, isSuperUser: boolean): Promise<any>;
    findByProject(projectId: string, isSuperUser: boolean): Promise<any[]>;
    update(id: string, updateColumnDto: UpdateColumnDto, userEmail: string, isSuperUser: boolean): Promise<any>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    private formatColumn;
}
