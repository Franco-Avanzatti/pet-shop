import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto, res: Response): Promise<{
        message: string;
        access_token: string;
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
        };
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        message: string;
        access_token: string;
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
        };
    }>;
    logout(res: Response): {
        message: string;
    };
    private setCookies;
}
