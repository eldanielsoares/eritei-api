import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { IUSER_REPOSITORY } from '../constants';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class FindUserByIdUsecase {
  constructor(
    @Inject(IUSER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
