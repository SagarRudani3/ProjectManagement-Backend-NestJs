import { INotificationStrategy, NotificationPayload } from './notification-strategy.interface';
export declare class EmailNotificationStrategy implements INotificationStrategy {
    private readonly logger;
    send(payload: NotificationPayload): Promise<void>;
}
