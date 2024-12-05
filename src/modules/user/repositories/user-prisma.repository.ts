import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO): Promise<UserEntity> {
    return this.prisma.user.create({
      data,
    });
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
