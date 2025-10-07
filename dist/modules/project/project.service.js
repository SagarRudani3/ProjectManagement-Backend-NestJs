"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("../../database/schemas/project.schema");
const column_schema_1 = require("../../database/schemas/column.schema");
const task_schema_1 = require("../../database/schemas/task.schema");
const DEFAULT_COLUMNS = [
    { name: "Proposed", order: 1 },
    { name: "Todo", order: 2 },
    { name: "Inprogress", order: 3 },
    { name: "Done", order: 4 },
    { name: "Deployed", order: 5 },
];
let ProjectService = class ProjectService {
    constructor(projectModel, columnModel, taskModel) {
        this.projectModel = projectModel;
        this.columnModel = columnModel;
        this.taskModel = taskModel;
    }
    async create(createProjectDto, userEmail, isSuperUser) {
        const project = await this.projectModel.create({
            ...createProjectDto,
            createdBy: userEmail,
            updatedBy: userEmail,
        });
        console.log("%c Line:28 🍭 project", "color:#fca650", project);
        const columns = await Promise.all(DEFAULT_COLUMNS.map((col) => this.columnModel.create({
            name: col.name,
            order: col.order,
            projectId: project._id,
            taskCount: 0,
            createdBy: userEmail,
            updatedBy: userEmail,
        })));
        return {
            ...this.formatProject(project, isSuperUser),
            columns: columns.map((col) => this.formatColumn(col, isSuperUser)),
        };
    }
    async findAll(user) {
        let query = { isDeleted: { $ne: true } };
        if (!user?.isSuperUser) {
            query.createdBy = user?.email;
        }
        const projects = await this.projectModel.find(query);
        const projectsWithColumns = await Promise.all(projects?.map(async (project) => {
            const columns = await this.columnModel
                .find({ projectId: project._id, isDeleted: { $ne: true } })
                .sort({ order: 1 });
            return {
                ...this.formatProject(project, user?.isSuperUser),
                columns: columns.map((col) => this.formatColumn(col, user?.isSuperUser)),
            };
        }));
        console.log("%c Line:71 🥐 projectsWithColumns", "color:#2eafb0", projectsWithColumns);
        return projectsWithColumns;
    }
    async findOne(id, isSuperUser) {
        const project = await this.projectModel.findById(id);
        if (!project || project.isDeleted) {
            throw new common_1.NotFoundException("Project not found");
        }
        const columns = await this.columnModel
            .find({ projectId: id, isDeleted: { $ne: true } })
            .sort({ order: 1 });
        const tasks = await this.taskModel
            .find({ projectId: id, isDeleted: { $ne: true } })
            .sort({ order: 1 });
        const columnsWithTasks = columns.map((column) => {
            const columnTasks = tasks.filter((task) => task.columnId.toString() === column._id.toString());
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
    async update(id, updateProjectDto, userEmail, isSuperUser) {
        const project = await this.projectModel.findByIdAndUpdate(id, { ...updateProjectDto, updatedBy: userEmail }, { new: true });
        if (!project) {
            throw new common_1.NotFoundException("Project not found");
        }
        return this.formatProject(project, isSuperUser);
    }
    async remove(id) {
        const project = await this.projectModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!project) {
            throw new common_1.NotFoundException("Project not found");
        }
        await this.columnModel.updateMany({ projectId: id }, { isDeleted: true });
        await this.taskModel.updateMany({ projectId: id }, { isDeleted: true });
        return { success: true, message: "Project deleted successfully" };
    }
    formatProject(project, isSuperUser) {
        const formatted = {
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
    formatColumn(column, isSuperUser) {
        const formatted = {
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
    formatTask(task, isSuperUser) {
        const formatted = {
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
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __param(1, (0, mongoose_1.InjectModel)(column_schema_1.Column.name)),
    __param(2, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProjectService);
//# sourceMappingURL=project.service.js.map