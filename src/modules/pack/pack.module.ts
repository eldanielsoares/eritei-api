import { Module } from '@nestjs/common';
import { PackController } from './pack.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePackUseCase } from './use-cases/create-pack.use-case';
import { PackPrismaRepository } from './repositories/pack-prisma.repository';
import { IPACK_REPOSITORY } from './constants';
import { FindPackByIdUseCase } from './use-cases/find-pack-by-id.use-case';
import { FindAllPacksUseCase } from './use-cases/find-all-packs.use-case';
import { PurchasePackUseCase } from './use-cases/purchase-pack.use-case';
import { UpdatePurchaseStatusPackUseCase } from './use-cases/update-purchase-status-pack.use-case';
import { PaymentProvider } from './providers/payment.provider';

@Module({
  imports: [PrismaClient],
  controllers: [PackController],
  providers: [
    PrismaService,
    PaymentProvider,
    CreatePackUseCase,
    FindPackByIdUseCase,
    FindAllPacksUseCase,
    PurchasePackUseCase,
    UpdatePurchaseStatusPackUseCase,
    PackPrismaRepository,
    { provide: IPACK_REPOSITORY, useExisting: PackPrismaRepository },
  ],
})
export class PackModule {}
