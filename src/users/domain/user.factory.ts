import { Role } from '@prisma/client';

export interface CreateUserProps {
  email: string;
  password: string;
  role?: Role;
}

export const createUserEntity = ({
  email,
  password,
  role,
}: CreateUserProps) => ({
  email,
  password, // ⚠️ en producción deberías hashear con bcrypt
  role: role ?? Role.USER,
});
