import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUSER_REPOSITORY } from '../constants';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class DeleteUserUsecase {
  constructor(
    @Inject(IUSER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException('user not found');

    return this.userRepository.delete(id);
  }
}
