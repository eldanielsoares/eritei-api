import { Inject, Injectable } from '@nestjs/common';
import { IUSerCardRepository } from '../repositories/user-card.repository';
import { IUSER_CARD_REPOSITORY } from '../constants';
import { GetInitialUserCardsDTO } from '../dtos/get-initial-cards.dto';
import { GetUserCardsByUserIdAndDeckIdDto } from '../dtos/get-user-card-by-userId-deckId.dto';

@Injectable()
export class GetUserCardsByUserIdAndDeckId {
  constructor(
    @Inject(IUSER_CARD_REPOSITORY)
    private readonly usercardRepository: IUSerCardRepository,
  ) {}

  execute(data: GetUserCardsByUserIdAndDeckIdDto) {
    return this.usercardRepository.getUserCardsByUserIdAndDeckId(data);
  }
}
