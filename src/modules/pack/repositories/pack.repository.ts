import { CreatePackDto } from '../dtos/create-pack.dto';
import { PurchaseWebhookDto } from '../dtos/puchase-webhook.dto';
import { PurchasePackDto } from '../dtos/purchase-pack.dto';
import { UpdatePurchasePackStatusDto } from '../dtos/update-purchase-pack-status.dto';
import { PackEntity } from '../entities/pack.entity';
import { PurchasePackEntity } from '../entities/purchase-pack.entity';

export interface IPackRepository {
  create(data: CreatePackDto): Promise<PackEntity>;
  findPackById(id: string): Promise<PackEntity>;
  findAllPacks(): Promise<PackEntity[]>;
  purchasePack(data: PurchasePackDto): Promise<PurchasePackEntity>;
  updatePurchaseStatusPack(
    data: UpdatePurchasePackStatusDto,
  ): Promise<PurchasePackEntity>;
  purchaseWebhookPack(data: PurchaseWebhookDto): Promise<void>;
  findPurchaseById(id: string): Promise<PurchasePackEntity>;
}
