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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../database/schemas/user.schema");
const activity_schema_1 = require("../../database/schemas/activity.schema");
const ui_notification_strategy_1 = require("../../strategies/ui-notification.strategy");
const email_notification_strategy_1 = require("../../strategies/email-notification.strategy");
let NotificationService = class NotificationService {
    constructor(userModel, activityModel, uiNotificationStrategy, emailNotificationStrategy) {
        this.userModel = userModel;
        this.activityModel = activityModel;
        this.uiNotificationStrategy = uiNotificationStrategy;
        this.emailNotificationStrategy = emailNotificationStrategy;
    }
    async notifyUsers(projectId, message, type, metadata) {
        const activity = await this.activityModel.create({
            projectId,
            userId: metadata?.userId || 'system',
            action: type,
            timestamp: new Date(),
        });
        const users = await this.userModel.find({});
        for (const user of users) {
            const payload = {
                userId: user.email,
                message,
                type,
                metadata,
            };
            if (user.isActive) {
                await this.uiNotificationStrategy.send(payload);
            }
            else {
                await this.emailNotificationStrategy.send(payload);
            }
        }
        return { success: true, notifiedUsers: users.length };
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(activity_schema_1.Activity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        ui_notification_strategy_1.UiNotificationStrategy,
        email_notification_strategy_1.EmailNotificationStrategy])
], NotificationService);
//# sourceMappingURL=notification.service.js.map