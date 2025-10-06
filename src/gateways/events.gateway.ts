import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('EventsGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_project')
  handleJoinProject(client: Socket, projectId: string) {
    client.join(`project_${projectId}`);
    this.logger.log(`Client ${client.id} joined project ${projectId}`);
    return { event: 'joined_project', data: { projectId } };
  }

  @SubscribeMessage('leave_project')
  handleLeaveProject(client: Socket, projectId: string) {
    client.leave(`project_${projectId}`);
    this.logger.log(`Client ${client.id} left project ${projectId}`);
    return { event: 'left_project', data: { projectId } };
  }

  emitTaskCreated(task: any) {
    this.server.to(`project_${task.projectId}`).emit('task_created', task);
    this.logger.log(`Emitted task_created for project ${task.projectId}`);
  }

  emitTaskUpdated(task: any) {
    this.server.to(`project_${task.projectId}`).emit('task_updated', task);
    this.logger.log(`Emitted task_updated for project ${task.projectId}`);
  }

  emitTaskMoved(task: any) {
    this.server.to(`project_${task.projectId}`).emit('task_moved', task);
    this.logger.log(`Emitted task_moved for project ${task.projectId}`);
  }

  emitNotification(notification: any) {
    this.server.emit('notification', notification);
    this.logger.log(`Emitted notification: ${notification.type}`);
  }
}
