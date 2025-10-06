import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task, TaskSchema } from '../../database/schemas/task.schema';
import { Column, ColumnSchema } from '../../database/schemas/column.schema';
import { Activity, ActivitySchema } from '../../database/schemas/activity.schema';
import { EventsModule } from '../../gateways/events.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: Activity.name, schema: ActivitySchema },
    ]),
    EventsModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
