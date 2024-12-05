import { Injectable } from '@nestjs/common';
import { IUSerCardRepository } from './user-card.repository';
import { GetInitialUserCardsDTO } from '../dtos/get-initial-cards.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserCardEntity } from '../entities/user-card.entity';
import { GetUserCardsByUserIdAndDeckIdDto } from '../dtos/get-user-card-by-userId-deckId.dto';

@Injectable()
export class UserCardPrismaRepository implements IUSerCardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getInitalCards({
    userId,
    deckId,
  }: GetInitialUserCardsDTO): Promise<UserCardEntity[]> {
    const cardsToAssign = await this.prisma.$queryRaw<{ id: string }[]>(
      Prisma.sql`
      SELECT c.id
      FROM cards c
      LEFT JOIN userCards uc ON c.id = uc.cardId AND uc.userId = ${userId}
      WHERE c.deckId = ${deckId}
        AND uc.cardId IS NULL
      ORDER BY RANDOM()
      LIMIT 10;
    `,
    );

    const cardsAssigned = cardsToAssign.map((card) => ({
      userId: userId,
      cardId: card.id,
      deckId,
    }));

    await this.prisma.userCard.createMany({
      data: [...cardsAssigned],
    });

    const createdCards = await this.prisma.userCard.findMany({
      where: {
        userId: userId,
        cardId: {
          in: cardsToAssign.map((card) => card.id),
        },
      },
    });

    return createdCards;
  }

  async getUserCardsByUserIdAndDeckId({
    userId,
    deckId,
  }: GetUserCardsByUserIdAndDeckIdDto): Promise<UserCardEntity[]> {
    const userCards = await this.prisma.userCard.findMany({
      where: { userId, deckId },
      include: {
        card: true,
      },
    });

    return userCards;
  }
}
