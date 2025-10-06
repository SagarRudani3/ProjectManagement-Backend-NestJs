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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_schema_1 = require("../../database/schemas/task.schema");
const column_schema_1 = require("../../database/schemas/column.schema");
const activity_schema_1 = require("../../database/schemas/activity.schema");
const task_factory_1 = require("../../factories/task.factory");
const events_gateway_1 = require("../../gateways/events.gateway");
let TaskService = class TaskService {
    constructor(taskModel, columnModel, activityModel, eventsGateway) {
        this.taskModel = taskModel;
        this.columnModel = columnModel;
        this.activityModel = activityModel;
        this.eventsGateway = eventsGateway;
    }
    async create(createTaskDto, userEmail, isSuperUser) {
        const tasksInColumn = await this.taskModel.countDocuments({ columnId: createTaskDto.columnId });
        const taskData = task_factory_1.TaskFactory.createTask({
            ...createTaskDto,
            columnId: new mongoose_2.Types.ObjectId(createTaskDto.columnId),
            projectId: new mongoose_2.Types.ObjectId(createTaskDto.projectId),
            order: createTaskDto.order ?? tasksInColumn,
            createdBy: userEmail,
            updatedBy: userEmail,
        });
        const task = await this.taskModel.create(taskData);
        await this.columnModel.findByIdAndUpdate(createTaskDto.columnId, { $inc: { taskCount: 1 } });
        await this.activityModel.create({
            projectId: task.projectId,
            taskId: task._id,
            userId: userEmail,
            action: 'task_created',
        });
        const formatted = this.formatTask(task, isSuperUser);
        this.eventsGateway.emitTaskCreated(formatted);
        return formatted;
    }
    async findAll(projectId, isSuperUser) {
        const tasks = await this.taskModel.find({ projectId }).sort({ order: 1 });
        return tasks.map((task) => this.formatTask(task, isSuperUser));
    }
    async findByColumn(columnId, isSuperUser) {
        const tasks = await this.taskModel.find({ columnId }).sort({ order: 1 });
        return tasks.map((task) => this.formatTask(task, isSuperUser));
    }
    async findOne(id, isSuperUser) {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        return this.formatTask(task, isSuperUser);
    }
    async update(id, updateTaskDto, userEmail, isSuperUser) {
        const task = await this.taskModel.findByIdAndUpdate(id, { ...updateTaskDto, updatedBy: userEmail }, { new: true });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        await this.activityModel.create({
            projectId: task.projectId,
            taskId: task._id,
            userId: userEmail,
            action: 'task_updated',
        });
        const formatted = this.formatTask(task, isSuperUser);
        this.eventsGateway.emitTaskUpdated(formatted);
        return formatted;
    }
    async move(id, moveTaskDto, userEmail, isSuperUser) {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        const oldColumnId = task.columnId;
        const newColumnId = new mongoose_2.Types.ObjectId(moveTaskDto.columnId);
        if (oldColumnId.toString() !== newColumnId.toString()) {
            await this.columnModel.findByIdAndUpdate(oldColumnId, { $inc: { taskCount: -1 } });
            await this.columnModel.findByIdAndUpdate(newColumnId, { $inc: { taskCount: 1 } });
        }
        task.columnId = newColumnId;
        task.order = moveTaskDto.order ?? task.order;
        task.updatedBy = userEmail;
        await task.save();
        await this.activityModel.create({
            projectId: task.projectId,
            taskId: task._id,
            userId: userEmail,
            action: 'task_moved',
        });
        const formatted = this.formatTask(task, isSuperUser);
        this.eventsGateway.emitTaskMoved(formatted);
        return formatted;
    }
    async remove(id) {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        await this.columnModel.findByIdAndUpdate(task.columnId, { $inc: { taskCount: -1 } });
        await this.taskModel.findByIdAndDelete(id);
        return { success: true, message: 'Task deleted successfully' };
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
        };
        if (isSuperUser) {
            formatted.createdBy = task.createdBy;
            formatted.updatedBy = task.updatedBy;
        }
        return formatted;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __param(1, (0, mongoose_1.InjectModel)(column_schema_1.Column.name)),
    __param(2, (0, mongoose_1.InjectModel)(activity_schema_1.Activity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        events_gateway_1.EventsGateway])
], TaskService);
//# sourceMappingURL=task.service.js.map