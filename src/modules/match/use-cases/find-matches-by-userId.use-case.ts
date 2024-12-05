import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { IMATCH_REPOSITORY } from '../constants';
import { IMatchRepository } from '../repositories/match.repository';
import { MatchEntity } from '../entities/match.entity';

@Injectable()
export class FindMatchesByUserIdUseCase {
  constructor(
    @Inject(IMATCH_REPOSITORY)
    private readonly matchRepository: IMatchRepository,
  ) {}

  async execute(userId: string): Promise<MatchEntity[]> {
    const match = await this.matchRepository.findMatchesByUserId(userId);

    if (!match) throw new NotAcceptableException('match not found');

    return match;
  }
}
