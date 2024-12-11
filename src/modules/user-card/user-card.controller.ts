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
import { JwtAuthGuard } from '../user/jwt/jwt-guard';
import { GetUserCardsByUserIdAndDeckId } from './use-cases/get-user-cards-by-user-id.use-case';
import { LinkUserCardsToUserUseCase } from './use-cases/link-user-cards-to-user.use-case';

@Controller('user-card')
export class UserCardController {
  @Inject(LinkUserCardsToUserUseCase)
  private readonly linkUserCardsToUserUseCase: LinkUserCardsToUserUseCase;

  @Inject(GetUserCardsByUserIdAndDeckId)
  private readonly getUserCardsByUserIdAndDeckId: GetUserCardsByUserIdAndDeckId;

  @UseGuards(JwtAuthGuard)
  @Post('get-initial')
  getInitialCards(@Body() data: { deckId: string }, @Request() req) {
    const userId = req.user.id;
    return this.linkUserCardsToUserUseCase.execute({
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
