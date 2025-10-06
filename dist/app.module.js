"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const project_module_1 = require("./modules/project/project.module");
const task_module_1 = require("./modules/task/task.module");
const column_module_1 = require("./modules/column/column.module");
const user_module_1 = require("./modules/user/user.module");
const notification_module_1 = require("./modules/notification/notification.module");
const events_module_1 = require("./gateways/events.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/project-management'),
            auth_module_1.AuthModule,
            project_module_1.ProjectModule,
            task_module_1.TaskModule,
            column_module_1.ColumnModule,
            user_module_1.UserModule,
            notification_module_1.NotificationModule,
            events_module_1.EventsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map