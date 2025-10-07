"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const project_controller_1 = require("./project.controller");
const project_service_1 = require("./project.service");
const project_schema_1 = require("../../database/schemas/project.schema");
const column_schema_1 = require("../../database/schemas/column.schema");
const task_schema_1 = require("../../database/schemas/task.schema");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user/user.module");
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: project_schema_1.Project.name, schema: project_schema_1.ProjectSchema },
                { name: column_schema_1.Column.name, schema: column_schema_1.ColumnSchema },
                { name: task_schema_1.Task.name, schema: task_schema_1.TaskSchema },
            ]),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
        ],
        controllers: [project_controller_1.ProjectController],
        providers: [project_service_1.ProjectService],
    })
], ProjectModule);
//# sourceMappingURL=project.module.js.map