import { Document, Types } from 'mongoose';
export declare class Task extends Document {
    title: string;
    description: string;
    columnId: Types.ObjectId;
    projectId: Types.ObjectId;
    order: number;
    createdBy: string;
    updatedBy: string;
}
export declare const TaskSchema: import("mongoose").Schema<Task, import("mongoose").Model<Task, any, any, any, Document<unknown, any, Task, any, {}> & Task & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Task, Document<unknown, {}, import("mongoose").FlatRecord<Task>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Task> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
