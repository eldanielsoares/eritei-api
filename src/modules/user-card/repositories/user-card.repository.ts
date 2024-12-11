import { GetUserCardsByUserIdAndDeckIdDto } from '../dtos/get-user-card-by-userId-deckId.dto';
import { LinkUserCardsToUserDTO } from '../dtos/link-user-cards-to-user.dto';
import { UserCardEntity } from '../entities/user-card.entity';

export interface IUSerCardRepository {
  linkUserCardsToUser(data: LinkUserCardsToUserDTO): Promise<UserCardEntity[]>;
  getUserCardsByUserIdAndDeckId(
    data: GetUserCardsByUserIdAndDeckIdDto,
  ): Promise<UserCardEntity[]>;
}
