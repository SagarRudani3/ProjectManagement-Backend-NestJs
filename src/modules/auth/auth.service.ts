import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string) {
    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = await this.userModel.create({ email });
    }

    return {
      success: true,
      message: 'OTP sent successfully (mock - any OTP will work)',
    };
  }

  async verifyOtp(email: string, otp: string) {
    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = await this.userModel.create({ email });
    }

    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        isSuperUser: user.isSuperUser,
      },
    };
  }

  async validateUser(userId: string) {
    return await this.userModel.findOne({
      _id: userId,
      $or: [{ isDeleted: { $exists: false } }, { isDeleted: false }]
    }).exec();
  }
}
