"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const notification_service_1 = require("./notification.service");
const user_schema_1 = require("../../database/schemas/user.schema");
const activity_schema_1 = require("../../database/schemas/activity.schema");
const ui_notification_strategy_1 = require("../../strategies/ui-notification.strategy");
const email_notification_strategy_1 = require("../../strategies/email-notification.strategy");
const events_module_1 = require("../../gateways/events.module");
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: activity_schema_1.Activity.name, schema: activity_schema_1.ActivitySchema },
            ]),
            events_module_1.EventsModule,
        ],
        providers: [notification_service_1.NotificationService, ui_notification_strategy_1.UiNotificationStrategy, email_notification_strategy_1.EmailNotificationStrategy],
        exports: [notification_service_1.NotificationService],
    })
], NotificationModule);
//# sourceMappingURL=notification.module.js.map