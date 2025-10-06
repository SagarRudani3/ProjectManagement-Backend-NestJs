import { Document, Types } from 'mongoose';
export declare class Activity extends Document {
    projectId: Types.ObjectId;
    taskId: Types.ObjectId;
    userId: string;
    action: string;
    timestamp: Date;
}
export declare const ActivitySchema: import("mongoose").Schema<Activity, import("mongoose").Model<Activity, any, any, any, Document<unknown, any, Activity, any, {}> & Activity & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Activity, Document<unknown, {}, import("mongoose").FlatRecord<Activity>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Activity> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
