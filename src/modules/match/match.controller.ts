import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateMatchUseCase } from './use-cases/create-match.use-case';
import { JwtAuthGuard } from '../user/jwt/jwt-guard';
import { CreateMatchDto } from './dtos/create-match.dto';
import { UpdateMatchDto } from './dtos/update-match.dto';
import { UpdateMatchShotsUseCase } from './use-cases/update-match-shots.use-case';
import { FindMatchByIdUseCase } from './use-cases/find-match-by-id.use-case';
import { FindMatchesByUserIdUseCase } from './use-cases/find-matches-by-userId.use-case';
import { DeleteMatchByIdUseCase } from './use-cases/delete-match-by-id.use-case';

@Controller('match')
export class MatchController {
  @Inject(CreateMatchUseCase)
  private readonly createMatchUseCase: CreateMatchUseCase;

  @Inject(UpdateMatchShotsUseCase)
  private readonly updateMatchShotsUseCase: UpdateMatchShotsUseCase;

  @Inject(FindMatchByIdUseCase)
  private readonly findMatchByIdUseCase: FindMatchByIdUseCase;

  @Inject(FindMatchesByUserIdUseCase)
  private readonly findMatchesByUserIdUseCase: FindMatchesByUserIdUseCase;

  @Inject(DeleteMatchByIdUseCase)
  private readonly deleteByIdUseCase: DeleteMatchByIdUseCase;

  @UseGuards(JwtAuthGuard)
  @Post()
  createMatch(@Body() data: CreateMatchDto, @Req() request) {
    const userId = request.user.id;
    return this.createMatchUseCase.execute({ ...data, userId });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateMatchShots(@Body() data: UpdateMatchDto) {
    return this.updateMatchShotsUseCase.execute({ ...data });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/matches')
  getMatchesByUserId(@Req() request) {
    const userId = request.user.id;
    return this.findMatchesByUserIdUseCase.execute(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMatchById(@Param() param: { id: string }) {
    return this.findMatchByIdUseCase.execute(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteMatchById(@Param() param: { id: string }) {
    return this.deleteByIdUseCase.execute(param.id);
  }
}
