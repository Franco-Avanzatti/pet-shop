import { User } from '@prisma/client';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { createUserEntity } from './domain/user.factory';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    const exists: User | null = await this.usersRepo.findByEmail(dto.email);
    if (exists) {
      throw new ConflictException('User already exists');
    }

    const user = createUserEntity(dto);
    return this.usersRepo.create(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user: User | null = await this.usersRepo.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // 👉 Para controllers / uso normal (lanza 404)
  async findById(id: string): Promise<User> {
    const user: User | null = await this.usersRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // 👉 EXCLUSIVO para Passport / JWT (NO lanza excepción)
  async findByIdOrNull(id: string): Promise<User | null> {
    return this.usersRepo.findById(id);
  }
}
