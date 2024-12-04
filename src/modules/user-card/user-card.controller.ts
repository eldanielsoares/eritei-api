import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GetInialCardsUseCase } from './use-cases/get-initial-cards.use-case';
import { JwtAuthGuard } from '../user/jwt/jwt-guard';
import { GetUserCardsByUserId } from './use-cases/get-user-cards-by-user-id.use-case';

@Controller('user-card')
export class UserCardController {
  @Inject(GetInialCardsUseCase)
  private readonly getInitialCardsUseCase: GetInialCardsUseCase;

  @Inject(GetUserCardsByUserId)
  private readonly getUserCardsByUserId: GetUserCardsByUserId;

  @UseGuards(JwtAuthGuard)
  @Post('get-initial')
  getInitialCards(@Body() data: { cheap: string }, @Request() req) {
    const userId = req.user.id;
    return this.getInitialCardsUseCase.execute({ cheap: data.cheap, userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getUserCardsUserId(@Request() req) {
    const userId = req.user.id;
    return this.getUserCardsByUserId.execute(userId);
  }
}
