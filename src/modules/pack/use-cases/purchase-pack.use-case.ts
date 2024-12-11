import { Inject, Injectable } from '@nestjs/common';
import { IPackRepository } from '../repositories/pack.repository';
import { IPACK_REPOSITORY } from '../constants';
import { PurchasePackPaymentDto } from '../dtos/purchase-pack.dto';
import { PurchasePackEntity } from '../entities/purchase-pack.entity';
import { PaymentProvider } from '../providers/payment.provider';

//no webhook checar se status é approved
@Injectable()
export class PurchasePackUseCase {
  constructor(
    @Inject(IPACK_REPOSITORY) private readonly packRepository: IPackRepository,
    private readonly paymentProvider: PaymentProvider,
  ) {}

  async execute(data: PurchasePackPaymentDto): Promise<PurchasePackEntity> {
    const { userId, packId, deckId, ...paymentData } = data;

    const payment = await this.paymentProvider.processPayment(paymentData);

    const purchase = await this.packRepository.purchasePack({
      userId,
      packId,
      paymentId: String(payment.id),
      deckId,
    });

    return purchase;
  }
}
