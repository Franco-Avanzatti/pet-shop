import { Role } from '@prisma/client';
export declare class UserResponseDto {
    id: string;
    email: string;
    role: Role;
    createdAt: Date;
}
