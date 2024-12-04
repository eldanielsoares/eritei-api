import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUsecase } from './use-cases/create-user.use-case';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { DeleteUserUsecase } from './use-cases/delete-user-by-id.use-case';
import { SessionDTO, SessionResponseDTO } from './dtos/session.dto';
import { FindUserByEmailUsecase } from './use-cases/find-user-by-email.use-case';
import { FindUserByIdUsecase } from './use-cases/find-user-by-id.use-case';
import { JwtAuthGuard } from './jwt/jwt-guard';

@Controller('user')
export class UserController {
  @Inject(CreateUserUsecase)
  private readonly createUserUseCase: CreateUserUsecase;

  @Inject(DeleteUserUsecase)
  private readonly deleteUserUsecase: DeleteUserUsecase;

  @Inject(FindUserByEmailUsecase)
  private readonly findUserByEmailUsecase: FindUserByEmailUsecase;

  @Inject(FindUserByIdUsecase)
  private readonly findUserByIdUsecase: FindUserByIdUsecase;

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Req() request): Promise<UserEntity> {
    const userId = request.user.id;
    return this.findUserByIdUsecase.execute(userId);
  }

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<UserEntity> {
    return this.createUserUseCase.execute(data);
  }

  @Post('/session')
  async session(@Body() data: SessionDTO): Promise<SessionResponseDTO> {
    return this.findUserByEmailUsecase.execute(data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteProfile(@Req() request) {
    const userId = request.user.id;
    await this.deleteUserUsecase.execute(userId);
    return 'User deleted successfully';
  }
}
