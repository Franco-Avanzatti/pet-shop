import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly usersRepo;
    constructor(usersRepo: UsersRepository);
    create(dto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    findByIdOrNull(id: string): Promise<User | null>;
}
