import { Module } from '@nestjs/common';
import { UserCardController } from './user-card.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { GetInialCardsUseCase } from './use-cases/get-initial-cards.use-case';
import { UserCardPrismaRepository } from './repositories/user-card-prisma-repository';
import { IUSER_CARD_REPOSITORY } from './constants';
import { UserModule } from '../user/user.module';
import { GetUserCardsByUserId } from './use-cases/get-user-cards-by-user-id.use-case';

@Module({
  imports: [PrismaClient],
  controllers: [UserCardController],
  providers: [
    PrismaService,
    GetInialCardsUseCase,
    GetUserCardsByUserId,
    UserCardPrismaRepository,
    {
      provide: IUSER_CARD_REPOSITORY,
      useExisting: UserCardPrismaRepository,
    },
  ],
  exports: [IUSER_CARD_REPOSITORY],
})
export class UserCardModule {}
