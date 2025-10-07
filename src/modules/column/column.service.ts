import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Types } from "mongoose";
import { Column } from "../../database/schemas/column.schema";
import { CreateColumnDto } from "./dto/create-column.dto";
import { UpdateColumnDto } from "./dto/update-column.dto";

import { Task } from "../../database/schemas/task.schema";

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<Column>,
    @InjectModel(Task.name) private taskModel: Model<Task>
  ) {}

  async create(
    createColumnDto: CreateColumnDto,
    userEmail: string,
    isSuperUser: boolean
  ) {
    const column = await this.columnModel.create({
      ...createColumnDto,
      projectId: new Types.ObjectId(createColumnDto.projectId),
      taskCount: 0,
      createdBy: userEmail,
      updatedBy: userEmail,
    });

    return this.formatColumn(column, isSuperUser);
  }

  async findByProject(projectId: string, isSuperUser: boolean) {
    console.log("%c Line:34 🌽 projectId", "color:#2eafb0", projectId);
    const columns = await this.columnModel
      .find({
        projectId: new mongoose.Types.ObjectId(projectId),
        isDeleted: { $ne: true },
      })
      .sort({ order: 1 });
    console.log("%c Line:31 🍋 columns", "color:#ea7e5c", columns);
    return columns;
  }

  async update(
    id: string,
    updateColumnDto: UpdateColumnDto,
    userEmail: string,
    isSuperUser: boolean
  ) {
    const column = await this.columnModel.findByIdAndUpdate(
      id,
      { ...updateColumnDto, updatedBy: userEmail },
      { new: true }
    );

    if (!column) {
      throw new NotFoundException("Column not found");
    }

    return this.formatColumn(column, isSuperUser);
  }

  async remove(id: string) {
    const column = await this.columnModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!column) {
      throw new NotFoundException("Column not found");
    }

    await this.taskModel.updateMany({ columnId: id }, { isDeleted: true });

    return { success: true, message: "Column deleted successfully" };
  }

  private formatColumn(column: any, isSuperUser: boolean) {
    const formatted: any = {
      id: column._id,
      name: column.name,
      order: column.order,
      taskCount: column.taskCount,
      projectId: column.projectId,
      createdAt: column.createdAt,
      updatedAt: column.updatedAt,
      isDeleted: column.isDeleted,
    };

    if (isSuperUser) {
      formatted.createdBy = column.createdBy;
      formatted.updatedBy = column.updatedBy;
    }

    return formatted;
  }
}
