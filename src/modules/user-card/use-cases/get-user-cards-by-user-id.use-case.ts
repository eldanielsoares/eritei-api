import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUSerCardRepository } from '../repositories/user-card.repository';
import { IUSER_CARD_REPOSITORY } from '../constants';
import { GetUserCardsByUserIdAndDeckIdDto } from '../dtos/get-user-card-by-userId-deckId.dto';
import { UserCardEntity } from '../entities/user-card.entity';

@Injectable()
export class GetUserCardsByUserIdAndDeckId {
  constructor(
    @Inject(IUSER_CARD_REPOSITORY)
    private readonly usercardRepository: IUSerCardRepository,
  ) {}

  async execute(
    data: GetUserCardsByUserIdAndDeckIdDto,
  ): Promise<UserCardEntity[]> {
    const userCards =
      await this.usercardRepository.getUserCardsByUserIdAndDeckId(data);

    if (!userCards?.length) throw new NotFoundException('cards not found');

    return userCards;
  }
}
