import { Module } from '@nestjs/common';
import { UserCardController } from './user-card.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserCardPrismaRepository } from './repositories/user-card-prisma-repository';
import { IUSER_CARD_REPOSITORY } from './constants';
import { GetUserCardsByUserIdAndDeckId } from './use-cases/get-user-cards-by-user-id.use-case';
import { LinkUserCardsToUserUseCase } from './use-cases/link-user-cards-to-user.use-case';

@Module({
  imports: [PrismaClient],
  controllers: [UserCardController],
  providers: [
    PrismaService,
    LinkUserCardsToUserUseCase,
    GetUserCardsByUserIdAndDeckId,
    UserCardPrismaRepository,
    {
      provide: IUSER_CARD_REPOSITORY,
      useExisting: UserCardPrismaRepository,
    },
  ],
  exports: [IUSER_CARD_REPOSITORY],
})
export class UserCardModule {}
