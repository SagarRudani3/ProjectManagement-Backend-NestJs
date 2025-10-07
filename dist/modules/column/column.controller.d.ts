import { ColumnService } from "./column.service";
import { CreateColumnDto } from "./dto/create-column.dto";
import { UpdateColumnDto } from "./dto/update-column.dto";
export declare class ColumnController {
    private readonly columnService;
    constructor(columnService: ColumnService);
    create(createColumnDto: CreateColumnDto, user: any): Promise<any>;
    findByProject(projectId: string, user: any): Promise<(import("mongoose").Document<unknown, {}, import("../../database/schemas/column.schema").Column, {}, {}> & import("../../database/schemas/column.schema").Column & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    update(id: string, updateColumnDto: UpdateColumnDto, user: any): Promise<any>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
