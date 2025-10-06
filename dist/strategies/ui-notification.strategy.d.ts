import { INotificationStrategy, NotificationPayload } from './notification-strategy.interface';
import { EventsGateway } from '../gateways/events.gateway';
export declare class UiNotificationStrategy implements INotificationStrategy {
    private eventsGateway;
    constructor(eventsGateway: EventsGateway);
    send(payload: NotificationPayload): Promise<void>;
}
