import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from '../mail/mail.service';
import { Role } from '@prisma/client';
export interface AuthResponse {
    user: {
        id: string;
        email: string;
        role: Role;
        createdAt: Date;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly mailService;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService);
    register(dto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    login(dto: LoginDto): Promise<AuthResponse>;
    private generateTokens;
}
