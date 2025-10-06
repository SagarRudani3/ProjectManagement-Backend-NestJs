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
exports.ColumnService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const column_schema_1 = require("../../database/schemas/column.schema");
let ColumnService = class ColumnService {
    constructor(columnModel) {
        this.columnModel = columnModel;
    }
    async create(createColumnDto, userEmail, isSuperUser) {
        const column = await this.columnModel.create({
            ...createColumnDto,
            projectId: new mongoose_2.Types.ObjectId(createColumnDto.projectId),
            taskCount: 0,
            createdBy: userEmail,
            updatedBy: userEmail,
        });
        return this.formatColumn(column, isSuperUser);
    }
    async findByProject(projectId, isSuperUser) {
        const columns = await this.columnModel.find({ projectId }).sort({ order: 1 });
        return columns.map((col) => this.formatColumn(col, isSuperUser));
    }
    async update(id, updateColumnDto, userEmail, isSuperUser) {
        const column = await this.columnModel.findByIdAndUpdate(id, { ...updateColumnDto, updatedBy: userEmail }, { new: true });
        if (!column) {
            throw new common_1.NotFoundException('Column not found');
        }
        return this.formatColumn(column, isSuperUser);
    }
    async remove(id) {
        const column = await this.columnModel.findByIdAndDelete(id);
        if (!column) {
            throw new common_1.NotFoundException('Column not found');
        }
        return { success: true, message: 'Column deleted successfully' };
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
        };
        if (isSuperUser) {
            formatted.createdBy = column.createdBy;
            formatted.updatedBy = column.updatedBy;
        }
        return formatted;
    }
};
exports.ColumnService = ColumnService;
exports.ColumnService = ColumnService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(column_schema_1.Column.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ColumnService);
//# sourceMappingURL=column.service.js.map