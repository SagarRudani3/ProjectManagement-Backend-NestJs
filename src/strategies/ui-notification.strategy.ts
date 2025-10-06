import { Injectable } from '@nestjs/common';
import { INotificationStrategy, NotificationPayload } from './notification-strategy.interface';
import { EventsGateway } from '../gateways/events.gateway';

@Injectable()
export class UiNotificationStrategy implements INotificationStrategy {
  constructor(private eventsGateway: EventsGateway) {}

  async send(payload: NotificationPayload): Promise<void> {
    this.eventsGateway.emitNotification(payload);
  }
}
