import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { IMATCH_REPOSITORY } from '../constants';
import { IMatchRepository } from '../repositories/match.repository';
import { MatchEntity } from '../entities/match.entity';
import { UpdateMatchDto } from '../dtos/update-match.dto';

@Injectable()
export class UpdateMatchShotsUseCase {
  constructor(
    @Inject(IMATCH_REPOSITORY)
    private readonly matchRepository: IMatchRepository,
  ) {}

  async execute(data: UpdateMatchDto): Promise<MatchEntity> {
    const match = await this.matchRepository.findMatchById(data.matchId);

    if (!match) throw new NotAcceptableException('match not found');

    const updatedMatch = await this.matchRepository.updateMatchShots(data);

    return updatedMatch;
  }
}
