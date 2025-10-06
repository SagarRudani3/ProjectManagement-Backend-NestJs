import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    login(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        success: boolean;
        token: string;
        user: {
            id: unknown;
            email: string;
            isSuperUser: boolean;
        };
    }>;
    validateUser(userId: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
