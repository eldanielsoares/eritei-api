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
import { GeneratePackPreferenceIdUseCase } from './use-cases/generate-pack-preferenceId.use-case';
import { UserCardPrismaRepository } from '../user-card/repositories/user-card-prisma-repository';
import { IUSER_CARD_REPOSITORY } from '../user-card/constants';
import { PurchaseWebhookPackUseCase } from './use-cases/purchase-webhook.use-case';

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
    GeneratePackPreferenceIdUseCase,
    PurchaseWebhookPackUseCase,
    PackPrismaRepository,
    { provide: IPACK_REPOSITORY, useExisting: PackPrismaRepository },
    UserCardPrismaRepository,
    {
      provide: IUSER_CARD_REPOSITORY,
      useExisting: UserCardPrismaRepository,
    },
  ],
})
export class PackModule {}
