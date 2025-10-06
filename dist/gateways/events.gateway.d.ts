import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinProject(client: Socket, projectId: string): {
        event: string;
        data: {
            projectId: string;
        };
    };
    handleLeaveProject(client: Socket, projectId: string): {
        event: string;
        data: {
            projectId: string;
        };
    };
    emitTaskCreated(task: any): void;
    emitTaskUpdated(task: any): void;
    emitTaskMoved(task: any): void;
    emitNotification(notification: any): void;
}
