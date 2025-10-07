import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project } from "../../database/schemas/project.schema";
import { Column } from "../../database/schemas/column.schema";
import { Task } from "../../database/schemas/task.schema";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

const DEFAULT_COLUMNS = [
  { name: "Proposed", order: 1 },
  { name: "Todo", order: 2 },
  { name: "Inprogress", order: 3 },
  { name: "Done", order: 4 },
  { name: "Deployed", order: 5 },
];

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Column.name) private columnModel: Model<Column>,
    @InjectModel(Task.name) private taskModel: Model<Task>
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    userEmail: string,
    isSuperUser: boolean
  ) {
    const project = await this.projectModel.create({
      ...createProjectDto,
      createdBy: userEmail,
      updatedBy: userEmail,
    });

    console.log("%c Line:28 🍭 project", "color:#fca650", project);
    const columns = await Promise.all(
      DEFAULT_COLUMNS.map((col) =>
        this.columnModel.create({
          name: col.name,
          order: col.order,
          projectId: project._id,
          taskCount: 0,
          createdBy: userEmail,
          updatedBy: userEmail,
        })
      )
    );

    return {
      ...this.formatProject(project, isSuperUser),
      columns: columns.map((col) => this.formatColumn(col, isSuperUser)),
    };
  }

  async findAll(user: any) {
    let query: any = { isDeleted: { $ne: true } };

    if (!user?.isSuperUser) {
      query.createdBy = user?.email;
    }

    const projects = await this.projectModel.find(query);
    const projectsWithColumns = await Promise.all(
      projects?.map(async (project) => {
        const columns = await this.columnModel
          .find({ projectId: project._id, isDeleted: { $ne: true } })
          .sort({ order: 1 });
        return {
          ...this.formatProject(project, user?.isSuperUser),
          columns: columns.map((col) =>
            this.formatColumn(col, user?.isSuperUser)
          ),
        };
      })
    );
    console.log(
      "%c Line:71 🥐 projectsWithColumns",
      "color:#2eafb0",
      projectsWithColumns
    );
    return projectsWithColumns;
  }

  async findOne(id: string, isSuperUser: boolean) {
    const project = await this.projectModel.findById(id);
    if (!project || project.isDeleted) {
      throw new NotFoundException("Project not found");
    }

    const columns = await this.columnModel
      .find({ projectId: id, isDeleted: { $ne: true } })
      .sort({ order: 1 });
    const tasks = await this.taskModel
      .find({ projectId: id, isDeleted: { $ne: true } })
      .sort({ order: 1 });

    const columnsWithTasks = columns.map((column) => {
      const columnTasks = tasks.filter(
        (task) => task.columnId.toString() === column._id.toString()
      );
      return {
        ...this.formatColumn(column, isSuperUser),
        tasks: columnTasks.map((task) => this.formatTask(task, isSuperUser)),
      };
    });

    return {
      ...this.formatProject(project, isSuperUser),
      columns: columnsWithTasks,
    };
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    userEmail: string,
    isSuperUser: boolean
  ) {
    const project = await this.projectModel.findByIdAndUpdate(
      id,
      { ...updateProjectDto, updatedBy: userEmail },
      { new: true }
    );

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    return this.formatProject(project, isSuperUser);
  }

  async remove(id: string) {
    const project = await this.projectModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!project) {
      throw new NotFoundException("Project not found");
    }

    await this.columnModel.updateMany({ projectId: id }, { isDeleted: true });
    await this.taskModel.updateMany({ projectId: id }, { isDeleted: true });

    return { success: true, message: "Project deleted successfully" };
  }

  private formatProject(project: any, isSuperUser: boolean) {
    const formatted: any = {
      id: project._id,
      name: project.name,
      description: project.description,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      isDeleted: project.isDeleted,
    };

    if (isSuperUser) {
      formatted.createdBy = project.createdBy;
      formatted.updatedBy = project.updatedBy;
    }

    return formatted;
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

    return formatted;
  }
}
