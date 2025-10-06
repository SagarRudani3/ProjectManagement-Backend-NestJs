"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmailNotificationStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotificationStrategy = void 0;
const common_1 = require("@nestjs/common");
let EmailNotificationStrategy = EmailNotificationStrategy_1 = class EmailNotificationStrategy {
    constructor() {
        this.logger = new common_1.Logger(EmailNotificationStrategy_1.name);
    }
    async send(payload) {
        this.logger.log(`Sending email to ${payload.userId}`);
        this.logger.log(`Subject: ${payload.type}`);
        this.logger.log(`Message: ${payload.message}`);
        this.logger.log(`Metadata: ${JSON.stringify(payload.metadata)}`);
    }
};
exports.EmailNotificationStrategy = EmailNotificationStrategy;
exports.EmailNotificationStrategy = EmailNotificationStrategy = EmailNotificationStrategy_1 = __decorate([
    (0, common_1.Injectable)()
], EmailNotificationStrategy);
//# sourceMappingURL=email-notification.strategy.js.map