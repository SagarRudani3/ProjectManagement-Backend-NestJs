"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const column_controller_1 = require("./column.controller");
const column_service_1 = require("./column.service");
const column_schema_1 = require("../../database/schemas/column.schema");
const task_schema_1 = require("../../database/schemas/task.schema");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user/user.module");
let ColumnModule = class ColumnModule {
};
exports.ColumnModule = ColumnModule;
exports.ColumnModule = ColumnModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            mongoose_1.MongooseModule.forFeature([
                { name: column_schema_1.Column.name, schema: column_schema_1.ColumnSchema },
                { name: task_schema_1.Task.name, schema: task_schema_1.TaskSchema },
            ]),
        ],
        controllers: [column_controller_1.ColumnController],
        providers: [column_service_1.ColumnService],
    })
], ColumnModule);
//# sourceMappingURL=column.module.js.map