import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
import { Activity } from '../../database/schemas/activity.schema';
import { UiNotificationStrategy } from '../../strategies/ui-notification.strategy';
import { EmailNotificationStrategy } from '../../strategies/email-notification.strategy';
export declare class NotificationService {
    private userModel;
    private activityModel;
    private uiNotificationStrategy;
    private emailNotificationStrategy;
    constructor(userModel: Model<User>, activityModel: Model<Activity>, uiNotificationStrategy: UiNotificationStrategy, emailNotificationStrategy: EmailNotificationStrategy);
    notifyUsers(projectId: string, message: string, type: any, metadata?: any): Promise<{
        success: boolean;
        notifiedUsers: number;
    }>;
}
