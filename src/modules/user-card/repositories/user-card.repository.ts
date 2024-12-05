import { GetInitialUserCardsDTO } from '../dtos/get-initial-cards.dto';
import { GetUserCardsByUserIdAndDeckIdDto } from '../dtos/get-user-card-by-userId-deckId.dto';
import { UserCardEntity } from '../entities/user-card.entity';

export interface IUSerCardRepository {
  getInitalCards(data: GetInitialUserCardsDTO): Promise<UserCardEntity[]>;
  getUserCardsByUserIdAndDeckId(
    data: GetUserCardsByUserIdAndDeckIdDto,
  ): Promise<UserCardEntity[]>;
}
