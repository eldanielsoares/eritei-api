import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPackRepository } from '../repositories/pack.repository';
import { IPACK_REPOSITORY } from '../constants';
import { PurchasePackDto } from '../dtos/purchase-pack.dto';
import { PurchasePackEntity } from '../entities/purchase-pack.entity';
import { PaymentProvider } from '../providers/payment.provider';

// chamado quando clicar no onSubmit do form
@Injectable()
export class GeneratePackPreferenceIdUseCase {
  constructor(
    @Inject(IPACK_REPOSITORY) private readonly packRepository: IPackRepository,
    private readonly paymentProvider: PaymentProvider,
  ) {}

  async execute(packId: string): Promise<any> {
    const pack = await this.packRepository.findPackById(packId);

    if (!pack) throw new NotFoundException('Pack not found');

    const preference = await this.paymentProvider.createPreference({
      id: pack.id,
      title: pack.name,
      description: pack.name,
      unit_price: pack.price,
    });

    console.log(preference);

    return preference.id;
  }
}
