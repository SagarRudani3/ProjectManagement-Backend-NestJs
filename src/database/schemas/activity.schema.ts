import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Activity extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Project' })
  projectId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Task' })
  taskId: Types.ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  action: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
