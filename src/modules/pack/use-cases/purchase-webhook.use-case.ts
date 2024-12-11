import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPackRepository } from '../repositories/pack.repository';
import { IPACK_REPOSITORY } from '../constants';
import { PurchaseWebhookDto } from '../dtos/puchase-webhook.dto';
import { IUSER_CARD_REPOSITORY } from 'src/modules/user-card/constants';
import { IUSerCardRepository } from 'src/modules/user-card/repositories/user-card.repository';

@Injectable()
export class PurchaseWebhookPackUseCase {
  constructor(
    @Inject(IPACK_REPOSITORY) private readonly packRepository: IPackRepository,
    @Inject(IUSER_CARD_REPOSITORY)
    private readonly userCardRepository: IUSerCardRepository,
  ) {}

  async execute(data: PurchaseWebhookDto): Promise<void> {
    const { paymentId, status } = data;
    const purchase = await this.packRepository.findPurchaseById(paymentId);

    if (!purchase) throw new NotFoundException('order not found');

    await this.packRepository.updatePurchaseStatusPack({
      status,
      packId: purchase.packId,
      userId: purchase.userId,
    });

    if (status === 'APPROVED') {
      const pack = await this.packRepository.findPackById(purchase.packId);
      await this.userCardRepository.linkUserCardsToUser({
        userId: purchase.userId,
        deckId: purchase.deckId,
        quantity: pack.quantity,
      });
    }
  }
}
