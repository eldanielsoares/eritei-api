import { GetInitialUserCardsDTO } from '../dtos/get-initial-cards.dto';
import { UserCardEntity } from '../entities/user-card.entity';

export interface IUSerCardRepository {
  getInitalCards(data: GetInitialUserCardsDTO): Promise<UserCardEntity[]>;
  getUserCardsByUserIdAndDeckId(
    userId: string,
    deckId: string,
  ): Promise<UserCardEntity[]>;
}
