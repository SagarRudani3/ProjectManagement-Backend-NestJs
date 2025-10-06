import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Column } from '../../database/schemas/column.schema';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnService {
  constructor(@InjectModel(Column.name) private columnModel: Model<Column>) {}

  async create(createColumnDto: CreateColumnDto, userEmail: string, isSuperUser: boolean) {
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
    const columns = await this.columnModel.find({ projectId }).sort({ order: 1 });
    return columns.map((col) => this.formatColumn(col, isSuperUser));
  }

  async update(id: string, updateColumnDto: UpdateColumnDto, userEmail: string, isSuperUser: boolean) {
    const column = await this.columnModel.findByIdAndUpdate(
      id,
      { ...updateColumnDto, updatedBy: userEmail },
      { new: true },
    );

    if (!column) {
      throw new NotFoundException('Column not found');
    }

    return this.formatColumn(column, isSuperUser);
  }

  async remove(id: string) {
    const column = await this.columnModel.findByIdAndDelete(id);
    if (!column) {
      throw new NotFoundException('Column not found');
    }
    return { success: true, message: 'Column deleted successfully' };
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
    };

    if (isSuperUser) {
      formatted.createdBy = column.createdBy;
      formatted.updatedBy = column.updatedBy;
    }

    return formatted;
  }
}
