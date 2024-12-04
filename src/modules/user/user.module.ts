import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserUsecase } from './use-cases/create-user.use-case';
import { UserPrismaRepository } from './repositories/user-prisma.repository';
import { IUSER_REPOSITORY } from './constants';
import { DeleteUserUsecase } from './use-cases/delete-user-by-id.use-case';
import { FindUserByEmailUsecase } from './use-cases/find-user-by-email.use-case';
import { FindUserByIdUsecase } from './use-cases/find-user-by-id.use-case';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt/jwt-guard';
import { JwtStrategy } from './jwt/jwt-strategy';

@Module({
  imports: [
    PrismaClient,
    JwtModule.register({
      secret: 'seu-segredo-aqui', // Este segredo deve ser colocado em uma variável de ambiente
      signOptions: { expiresIn: '60m' }, // Tempo de expiração do token
    }),
  ],
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUsecase,
    FindUserByIdUsecase,
    DeleteUserUsecase,
    FindUserByEmailUsecase,
    UserPrismaRepository,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: IUSER_REPOSITORY,
      useExisting: UserPrismaRepository,
    },
  ],
  exports: [IUSER_REPOSITORY],
})
export class UserModule {}
