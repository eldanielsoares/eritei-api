import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePackUseCase } from './use-cases/create-pack.use-case';
import { CreatePackDto } from './dtos/create-pack.dto';
import { FindPackByIdUseCase } from './use-cases/find-pack-by-id.use-case';
import { FindAllPacksUseCase } from './use-cases/find-all-packs.use-case';
import { PurchasePackPaymentDto } from './dtos/purchase-pack.dto';
import { PurchasePackUseCase } from './use-cases/purchase-pack.use-case';
import { JwtAuthGuard } from '../user/jwt/jwt-guard';
import { UpdatePurchaseStatusPackUseCase } from './use-cases/update-purchase-status-pack.use-case';
import { UpdatePurchasePackStatusDto } from './dtos/update-purchase-pack-status.dto';
import { GeneratePackPreferenceIdUseCase } from './use-cases/generate-pack-preferenceId.use-case';
import { PurchaseWebhookPackUseCase } from './use-cases/purchase-webhook.use-case';
import { PurchaseWebhookDto } from './dtos/puchase-webhook.dto';

@Controller('pack')
export class PackController {
  @Inject(CreatePackUseCase)
  private readonly createPackUseCase: CreatePackUseCase;

  @Inject(FindPackByIdUseCase)
  private readonly findPackByIdUseCase: FindPackByIdUseCase;

  @Inject(FindAllPacksUseCase)
  private readonly findAllPacksUseCase: FindAllPacksUseCase;

  @Inject(PurchasePackUseCase)
  private readonly purchasePackUseCase: PurchasePackUseCase;

  @Inject(UpdatePurchaseStatusPackUseCase)
  private readonly updatePurchaseStatusPackUseCase: UpdatePurchaseStatusPackUseCase;

  @Inject(GeneratePackPreferenceIdUseCase)
  private readonly generatePackPreferenceIdUseCase: GeneratePackPreferenceIdUseCase;

  @Inject(PurchaseWebhookPackUseCase)
  private readonly purchaseWebhookPackUseCase: PurchaseWebhookPackUseCase;

  @UseGuards(JwtAuthGuard)
  @Post()
  createPack(@Body() data: CreatePackDto) {
    return this.createPackUseCase.execute(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  getAllPacks() {
    return this.findAllPacksUseCase.execute();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getPackById(@Param() param: { id: string }) {
    return this.findPackByIdUseCase.execute(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/purchase/webhook')
  purchaseWebhook(@Body() data: PurchaseWebhookDto) {
    return this.purchaseWebhookPackUseCase.execute(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/purchase/preferenceId')
  postPreferenceIdPack(@Body() data: { packId: string }) {
    return this.generatePackPreferenceIdUseCase.execute(data.packId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/purchase')
  postPurchasePack(@Body() data: PurchasePackPaymentDto, @Req() request) {
    const userId = String(request.user.id);
    const purchaseData = { userId, ...data };
    return this.purchasePackUseCase.execute(purchaseData);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/purchase/:id')
  updatePurchaseStatusPack(
    @Body() data: UpdatePurchasePackStatusDto,
    @Param() param: { id: string },
  ) {
    return this.updatePurchaseStatusPackUseCase.execute({
      ...data,
      packId: param.id,
    });
  }
}
