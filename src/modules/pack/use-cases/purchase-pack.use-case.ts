import { Inject, Injectable } from '@nestjs/common';
import { IPackRepository } from '../repositories/pack.repository';
import { IPACK_REPOSITORY } from '../constants';
import { PurchasePackDto } from '../dtos/purchase-pack.dto';
import { PurchasePackEntity } from '../entities/purchase-pack.entity';
import { PaymentProvider } from '../providers/payment.provider';

@Injectable()
export class PurchasePackUseCase {
  constructor(
    @Inject(IPACK_REPOSITORY) private readonly packRepository: IPackRepository,
    private readonly paymentProvider: PaymentProvider,
  ) {}

  async execute(data: PurchasePackDto): Promise<PurchasePackEntity> {
    const purchase = await this.packRepository.purchasePack(data);

    return purchase;
  }
}
