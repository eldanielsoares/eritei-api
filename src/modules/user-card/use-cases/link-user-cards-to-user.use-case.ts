import { Inject, Injectable } from '@nestjs/common';
import { IUSerCardRepository } from '../repositories/user-card.repository';
import { IUSER_CARD_REPOSITORY } from '../constants';
import { LinkUserCardsToUserDTO } from '../dtos/link-user-cards-to-user.dto';

@Injectable()
export class LinkUserCardsToUserUseCase {
  constructor(
    @Inject(IUSER_CARD_REPOSITORY)
    private readonly usercardRepository: IUSerCardRepository,
  ) {}

  execute(data: LinkUserCardsToUserDTO) {
    return this.usercardRepository.linkUserCardsToUser(data);
  }
}
