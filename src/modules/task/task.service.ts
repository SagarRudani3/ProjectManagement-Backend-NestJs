import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Types } from "mongoose";
import { Task } from "../../database/schemas/task.schema";
import { Column } from "../../database/schemas/column.schema";
import { Activity } from "../../database/schemas/activity.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { MoveTaskDto } from "./dto/move-task.dto";
import { TaskFactory } from "../../factories/task.factory";
import { EventsGateway } from "../../gateways/events.gateway";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(Column.name) private columnModel: Model<Column>,
    @InjectModel(Activity.name) private activityModel: Model<Activity>,
    private eventsGateway: EventsGateway
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
    userEmail: string,
    isSuperUser: boolean
  ) {
    const tasksInColumn = await this.taskModel.countDocuments({
      columnId: createTaskDto.columnId,
      isDeleted: { $ne: true },
    });

    const taskData = TaskFactory.createTask({
      ...createTaskDto,
      columnId: new Types.ObjectId(createTaskDto.columnId),
      projectId: new Types.ObjectId(createTaskDto.projectId),
      order: createTaskDto.order ?? tasksInColumn,
      createdBy: userEmail,
      updatedBy: userEmail,
    });

    const task = await this.taskModel.create(taskData);

    await this.columnModel.findByIdAndUpdate(createTaskDto.columnId, {
      $inc: { taskCount: 1 },
    });

    await this.activityModel.create({
      projectId: task.projectId,
      taskId: task._id,
      userId: userEmail,
      action: "task_created",
    });

    const formatted = this.formatTask(task, isSuperUser);
    this.eventsGateway.emitTaskCreated(formatted);

    return formatted;
  }

  async findAll(projectId: string, isSuperUser: boolean) {
    const tasks = await this.taskModel
      .find({
        projectId: new mongoose.Types.ObjectId(projectId),
        isDeleted: { $ne: true },
      })
      .sort({ order: 1 });
    return tasks.map((task) => this.formatTask(task, isSuperUser));
  }

  async findByColumn(columnId: string, isSuperUser: boolean) {
    const tasks = await this.taskModel
      .find({
        columnId: new mongoose.Types.ObjectId(columnId),
        isDeleted: { $ne: true },
      })
      .sort({ order: 1 });
    return tasks.map((task) => this.formatTask(task, isSuperUser));
  }

  async findOne(id: string, isSuperUser: boolean) {
    const task = await this.taskModel.findById(id);
    if (!task || task.isDeleted) {
      throw new NotFoundException("Task not found");
    }
    return this.formatTask(task, isSuperUser);
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userEmail: string,
    isSuperUser: boolean
  ) {
    const task = await this.taskModel.findByIdAndUpdate(
      id,
      { ...updateTaskDto, updatedBy: userEmail },
      { new: true }
    );

    if (!task) {
      throw new NotFoundException("Task not found");
    }

    await this.activityModel.create({
      projectId: task.projectId,
      taskId: task._id,
      userId: userEmail,
      action: "task_updated",
    });

    const formatted = this.formatTask(task, isSuperUser);
    this.eventsGateway.emitTaskUpdated(formatted);

    return formatted;
  }

  async move(
    id: string,
    moveTaskDto: MoveTaskDto,
    userEmail: string,
    isSuperUser: boolean
  ) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException("Task not found");
    }

    const oldColumnId = task.columnId;
    const newColumnId = new Types.ObjectId(moveTaskDto.columnId);

    if (oldColumnId.toString() !== newColumnId.toString()) {
      await this.columnModel.findByIdAndUpdate(oldColumnId, {
        $inc: { taskCount: -1 },
      });
      await this.columnModel.findByIdAndUpdate(newColumnId, {
        $inc: { taskCount: 1 },
      });
    }

    task.columnId = newColumnId;
    task.order = moveTaskDto.order ?? task.order;
    task.updatedBy = userEmail;
    await task.save();

    await this.activityModel.create({
      projectId: task.projectId,
      taskId: task._id,
      userId: userEmail,
      action: "task_moved",
    });

    const formatted = this.formatTask(task, isSuperUser);
    this.eventsGateway.emitTaskMoved(formatted);

    return formatted;
  }

  async remove(id: string) {
    const task = await this.taskModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!task) {
      throw new NotFoundException("Task not found");
    }

    await this.columnModel.findByIdAndUpdate(task.columnId, {
      $inc: { taskCount: -1 },
    });

    return { success: true, message: "Task deleted successfully" };
  }

  private formatTask(task: any, isSuperUser: boolean) {
    const formatted: any = {
      id: task._id,
      title: task.title,
      description: task.description,
      columnId: task.columnId,
      projectId: task.projectId,
      order: task.order,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      isDeleted: task.isDeleted,
    };

    if (isSuperUser) {
      formatted.createdBy = task.createdBy;
      formatted.updatedBy = task.updatedBy;
    }

    console.log("%c Line:194 🍷 formatted", "color:#b03734", formatted);
    return formatted;
  }
}
