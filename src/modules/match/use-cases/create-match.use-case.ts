import { Inject, Injectable } from '@nestjs/common';
import { IMATCH_REPOSITORY } from '../constants';
import { IMatchRepository } from '../repositories/match.repository';
import { CreateMatchDto } from '../dtos/create-match.dto';
import { MatchEntity } from '../entities/match.entity';

@Injectable()
export class CreateMatchUseCase {
  constructor(
    @Inject(IMATCH_REPOSITORY)
    private readonly matchRepository: IMatchRepository,
  ) {}

  async execute(data: CreateMatchDto): Promise<MatchEntity> {
    const match = await this.matchRepository.create(data);

    return match;
  }
}
