import { Injectable } from '@nestjs/common';
import { IPackRepository } from './pack.repository';
import { CreatePackDto } from '../dtos/create-pack.dto';
import { PackEntity } from '../entities/pack.entity';
import { PrismaService } from 'src/prisma.service';
import { PurchasePackEntity } from '../entities/purchase-pack.entity';
import { PurchasePackDto } from '../dtos/purchase-pack.dto';
import { UpdatePurchasePackStatusDto } from '../dtos/update-purchase-pack-status.dto';
import { PurchaseWebhookDto } from '../dtos/puchase-webhook.dto';

@Injectable()
export class PackPrismaRepository implements IPackRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreatePackDto): Promise<PackEntity> {
    return this.prisma.pack.create({ data });
  }

  findPackById(id: string): Promise<PackEntity> {
    return this.prisma.pack.findFirst({ where: { id } });
  }

  findAllPacks(): Promise<PackEntity[]> {
    return this.prisma.pack.findMany();
  }

  purchasePack(data: PurchasePackDto): Promise<PurchasePackEntity> {
    return this.prisma.purchase.create({ data });
  }

  updatePurchaseStatusPack(
    data: UpdatePurchasePackStatusDto,
  ): Promise<PurchasePackEntity> {
    return this.prisma.purchase.update({
      where: { id: data.packId },
      data: { status: data.status },
    });
  }

  async purchaseWebhookPack(data: PurchaseWebhookDto): Promise<void> {
    await this.prisma.purchase.update({
      where: { paymentId: data.paymentId },
      data: { status: data.status },
    });
  }

  findPurchaseById(id: string): Promise<PurchasePackEntity> {
    return this.prisma.purchase.findUnique({
      where: { id },
    });
  }
}
