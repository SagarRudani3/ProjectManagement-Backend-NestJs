import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { ProjectModule } from "./modules/project/project.module";
import { TaskModule } from "./modules/task/task.module";
import { ColumnModule } from "./modules/column/column.module";
import { UserModule } from "./modules/user/user.module";
import { NotificationModule } from "./modules/notification/notification.module";
import { EventsModule } from "./gateways/events.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggingInterceptor } from "./logging.interceptor";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    }),

    AuthModule,
    ProjectModule,
    TaskModule,
    ColumnModule,
    UserModule,
    NotificationModule,
    EventsModule,
  ],
})
export class AppModule {}
