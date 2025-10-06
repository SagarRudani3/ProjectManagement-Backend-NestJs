import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
import { Activity } from '../../database/schemas/activity.schema';
import { UiNotificationStrategy } from '../../strategies/ui-notification.strategy';
import { EmailNotificationStrategy } from '../../strategies/email-notification.strategy';
import { NotificationPayload } from '../../strategies/notification-strategy.interface';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Activity.name) private activityModel: Model<Activity>,
    private uiNotificationStrategy: UiNotificationStrategy,
    private emailNotificationStrategy: EmailNotificationStrategy,
  ) {}

  async notifyUsers(projectId: string, message: string, type: any, metadata?: any) {
    const activity = await this.activityModel.create({
      projectId,
      userId: metadata?.userId || 'system',
      action: type,
      timestamp: new Date(),
    });

    const users = await this.userModel.find({});

    for (const user of users) {
      const payload: NotificationPayload = {
        userId: user.email,
        message,
        type,
        metadata,
      };

      if (user.isActive) {
        await this.uiNotificationStrategy.send(payload);
      } else {
        await this.emailNotificationStrategy.send(payload);
      }
    }

    return { success: true, notifiedUsers: users.length };
  }
}
