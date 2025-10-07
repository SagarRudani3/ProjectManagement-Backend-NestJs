import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        message: string;
    }>;
    verify(verifyOtpDto: VerifyOtpDto): Promise<{
        success: boolean;
        token: string;
        user: {
            id: unknown;
            email: string;
            isSuperUser: boolean;
        };
    }>;
    getMe(req: any): Promise<{
        id: any;
        email: any;
        isSuperUser: any;
    }>;
}
