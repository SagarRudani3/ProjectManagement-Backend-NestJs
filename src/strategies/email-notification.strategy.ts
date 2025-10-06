import { Injectable, Logger } from "@nestjs/common";
import {
  INotificationStrategy,
  NotificationPayload,
} from "./notification-strategy.interface";

@Injectable()
export class EmailNotificationStrategy implements INotificationStrategy {
  private readonly logger = new Logger(EmailNotificationStrategy.name);

  async send(payload: NotificationPayload): Promise<void> {
    this.logger.log(`Sending email to ${payload.userId}`);
    this.logger.log(`Subject: ${payload.type}`);
    this.logger.log(`Message: ${payload.message}`);
    this.logger.log(`Metadata: ${JSON.stringify(payload.metadata)}`);
  }
}
