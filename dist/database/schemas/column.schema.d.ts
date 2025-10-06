import { Document, Types } from 'mongoose';
export declare class Column extends Document {
    name: string;
    order: number;
    projectId: Types.ObjectId;
    taskCount: number;
    createdBy: string;
    updatedBy: string;
}
export declare const ColumnSchema: import("mongoose").Schema<Column, import("mongoose").Model<Column, any, any, any, Document<unknown, any, Column, any, {}> & Column & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Column, Document<unknown, {}, import("mongoose").FlatRecord<Column>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Column> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
