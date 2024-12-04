import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { IUSER_REPOSITORY } from '../constants';
import { SessionDTO, SessionResponseDTO } from '../dtos/session.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FindUserByEmailUsecase {
  constructor(
    @Inject(IUSER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    private readonly jwtService: JwtService,
  ) {}

  async execute(data: SessionDTO): Promise<SessionResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw new BadRequestException('Email or Password is Incorrect');

    const matchPassword = await bcrypt.compare(data.password, user.password);

    if (!matchPassword)
      throw new BadRequestException('Email or Password is Incorrect');

    const payload = { username: user.email, sub: user.id };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}
