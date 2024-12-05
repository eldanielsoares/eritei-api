import { Inject, Injectable } from '@nestjs/common';
import { IUSerCardRepository } from '../repositories/user-card.repository';
import { IUSER_CARD_REPOSITORY } from '../constants';
import { GetInitialUserCardsDTO } from '../dtos/get-initial-cards.dto';

@Injectable()
export class GetUserCardsByUserIdAndDeckId {
  constructor(
    @Inject(IUSER_CARD_REPOSITORY)
    private readonly usercardRepository: IUSerCardRepository,
  ) {}

  execute(userId: string, deckId: string) {
    return this.usercardRepository.getUserCardsByUserIdAndDeckId(
      userId,
      deckId,
    );
  }
}
