import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { IMATCH_REPOSITORY } from '../constants';
import { IMatchRepository } from '../repositories/match.repository';

@Injectable()
export class DeleteMatchByIdUseCase {
  constructor(
    @Inject(IMATCH_REPOSITORY)
    private readonly matchRepository: IMatchRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const match = await this.matchRepository.findMatchById(id);

    if (!match) throw new NotAcceptableException('match not found');

    return this.matchRepository.deleteMatch(id);
  }
}
