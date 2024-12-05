import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateMatchUseCase } from './use-cases/create-match.use-case';
import { MatchPrismaRepository } from './repositories/match-prisma.repository';
import { IMATCH_REPOSITORY } from './constants';
import { FindMatchByIdUseCase } from './use-cases/find-match-by-id.use-case';
import { FindMatchesByUserIdUseCase } from './use-cases/find-matches-by-userId.use-case';
import { UpdateMatchShotsUseCase } from './use-cases/update-match-shots.use-case';
import { DeleteMatchByIdUseCase } from './use-cases/delete-match-by-id.use-case';

@Module({
  imports: [PrismaClient],
  controllers: [MatchController],
  providers: [
    PrismaService,
    CreateMatchUseCase,
    FindMatchByIdUseCase,
    FindMatchesByUserIdUseCase,
    UpdateMatchShotsUseCase,
    DeleteMatchByIdUseCase,
    MatchPrismaRepository,
    {
      provide: IMATCH_REPOSITORY,
      useExisting: MatchPrismaRepository,
    },
  ],
  exports: [IMATCH_REPOSITORY],
})
export class MatchModule {}
