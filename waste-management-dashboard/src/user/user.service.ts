import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ name: data.name }, { email: data.email }],
      },
    });

    if (existingUser) {
      if (existingUser.name === data.name) {
        throw new ConflictException('Username already exists');
      } else if (existingUser.email === data.email) {
        throw new ConflictException('Email already exists');
      }
    }

    return this.prisma.user.create({ data });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
