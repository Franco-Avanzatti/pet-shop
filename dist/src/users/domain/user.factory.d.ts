import { Role } from '@prisma/client';
export interface CreateUserProps {
    email: string;
    password: string;
    role?: Role;
}
export declare const createUserEntity: ({ email, password, role, }: CreateUserProps) => {
    email: string;
    password: string;
    role: import("@prisma/client").$Enums.Role;
};
