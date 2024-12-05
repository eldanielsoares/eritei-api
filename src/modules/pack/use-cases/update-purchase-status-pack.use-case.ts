import { Inject, Injectable } from '@nestjs/common';
import { IPackRepository } from '../repositories/pack.repository';
import { IPACK_REPOSITORY } from '../constants';
import { PurchasePackDto } from '../dtos/purchase-pack.dto';
import { PurchasePackEntity } from '../entities/purchase-pack.entity';
import { UpdatePurchasePackStatusDto } from '../dtos/update-purchase-pack-status.dto';

@Injectable()
export class UpdatePurchaseStatusPackUseCase {
  constructor(
    @Inject(IPACK_REPOSITORY) private readonly packRepository: IPackRepository,
  ) {}

  execute(data: UpdatePurchasePackStatusDto): Promise<PurchasePackEntity> {
    return this.packRepository.updatePurchaseStatusPack(data);
  }
}
