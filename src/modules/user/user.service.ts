import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async toggleSuperUser(userId: string, password: string) {
    if (password !== 'admin123') {
      throw new UnauthorizedException('Invalid password');
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    user.isSuperUser = !user.isSuperUser;
    await user.save();

    return {
      success: true,
      isSuperUser: user.isSuperUser,
      message: `Super user mode ${user.isSuperUser ? 'enabled' : 'disabled'}`,
    };
  }
}
