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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let EventsGateway = class EventsGateway {
    constructor() {
        this.logger = new common_1.Logger('EventsGateway');
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleJoinProject(client, projectId) {
        client.join(`project_${projectId}`);
        this.logger.log(`Client ${client.id} joined project ${projectId}`);
        return { event: 'joined_project', data: { projectId } };
    }
    handleLeaveProject(client, projectId) {
        client.leave(`project_${projectId}`);
        this.logger.log(`Client ${client.id} left project ${projectId}`);
        return { event: 'left_project', data: { projectId } };
    }
    emitTaskCreated(task) {
        this.server.to(`project_${task.projectId}`).emit('task_created', task);
        this.logger.log(`Emitted task_created for project ${task.projectId}`);
    }
    emitTaskUpdated(task) {
        this.server.to(`project_${task.projectId}`).emit('task_updated', task);
        this.logger.log(`Emitted task_updated for project ${task.projectId}`);
    }
    emitTaskMoved(task) {
        this.server.to(`project_${task.projectId}`).emit('task_moved', task);
        this.logger.log(`Emitted task_moved for project ${task.projectId}`);
    }
    emitNotification(notification) {
        this.server.emit('notification', notification);
        this.logger.log(`Emitted notification: ${notification.type}`);
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join_project'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleJoinProject", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave_project'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleLeaveProject", null);
exports.EventsGateway = EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map