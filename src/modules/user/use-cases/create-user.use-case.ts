import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { IUSER_REPOSITORY } from '../constants';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject(IUSER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: CreateUserDTO): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(data.email);

    if (user) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = {
      ...data,
      password: hashedPassword,
    };

    return this.userRepository.create(userData);
  }
}
