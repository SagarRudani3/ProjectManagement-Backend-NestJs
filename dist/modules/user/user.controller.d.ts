import { UserService } from './user.service';
import { ToggleSuperUserDto } from './dto/toggle-super-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    toggleSuperUser(toggleDto: ToggleSuperUserDto, user: any): Promise<{
        success: boolean;
        isSuperUser: boolean;
        message: string;
    }>;
}
