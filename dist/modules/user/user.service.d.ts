import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    toggleSuperUser(userId: string, password: string): Promise<{
        success: boolean;
        isSuperUser: boolean;
        message: string;
    }>;
}
