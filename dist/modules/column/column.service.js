"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const mongoose_2 = __importStar(require("mongoose"));
const column_schema_1 = require("../../database/schemas/column.schema");
const task_schema_1 = require("../../database/schemas/task.schema");
let ColumnService = class ColumnService {
    constructor(columnModel, taskModel) {
        this.columnModel = columnModel;
        this.taskModel = taskModel;
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
        console.log("%c Line:34 🌽 projectId", "color:#2eafb0", projectId);
        const columns = await this.columnModel
            .find({
            projectId: new mongoose_2.default.Types.ObjectId(projectId),
            isDeleted: { $ne: true },
        })
            .sort({ order: 1 });
        console.log("%c Line:31 🍋 columns", "color:#ea7e5c", columns);
        return columns;
    }
    async update(id, updateColumnDto, userEmail, isSuperUser) {
        const column = await this.columnModel.findByIdAndUpdate(id, { ...updateColumnDto, updatedBy: userEmail }, { new: true });
        if (!column) {
            throw new common_1.NotFoundException("Column not found");
        }
        return this.formatColumn(column, isSuperUser);
    }
    async remove(id) {
        const column = await this.columnModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!column) {
            throw new common_1.NotFoundException("Column not found");
        }
        await this.taskModel.updateMany({ columnId: id }, { isDeleted: true });
        return { success: true, message: "Column deleted successfully" };
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
};
exports.ColumnService = ColumnService;
exports.ColumnService = ColumnService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(column_schema_1.Column.name)),
    __param(1, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ColumnService);
//# sourceMappingURL=column.service.js.map