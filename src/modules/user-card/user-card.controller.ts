import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GetInialCardsUseCase } from './use-cases/get-initial-cards.use-case';
import { JwtAuthGuard } from '../user/jwt/jwt-guard';
import { GetUserCardsByUserIdAndDeckId } from './use-cases/get-user-cards-by-user-id.use-case';

@Controller('user-card')
export class UserCardController {
  @Inject(GetInialCardsUseCase)
  private readonly getInitialCardsUseCase: GetInialCardsUseCase;

  @Inject(GetUserCardsByUserIdAndDeckId)
  private readonly getUserCardsByUserIdAndDeckId: GetUserCardsByUserIdAndDeckId;

  @UseGuards(JwtAuthGuard)
  @Post('get-initial')
  getInitialCards(@Body() data: { deckId: string }, @Request() req) {
    const userId = req.user.id;
    return this.getInitialCardsUseCase.execute({
      deckId: data.deckId,
      userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':deckId')
  getUserCardsUserId(@Request() req, @Param() param: { deckId: string }) {
    const userId = req.user.id;

    return this.getUserCardsByUserIdAndDeckId.execute({
      userId,
      deckId: param.deckId,
    });
  }
}
