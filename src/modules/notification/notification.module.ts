import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from './notification.service';
import { User, UserSchema } from '../../database/schemas/user.schema';
import { Activity, ActivitySchema } from '../../database/schemas/activity.schema';
import { UiNotificationStrategy } from '../../strategies/ui-notification.strategy';
import { EmailNotificationStrategy } from '../../strategies/email-notification.strategy';
import { EventsModule } from '../../gateways/events.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Activity.name, schema: ActivitySchema },
    ]),
    EventsModule,
  ],
  providers: [NotificationService, UiNotificationStrategy, EmailNotificationStrategy],
  exports: [NotificationService],
})
export class NotificationModule {}
