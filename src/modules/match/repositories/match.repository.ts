import { MatchEntity } from '../entities/match.entity';
import { CreateMatchDto } from '../dtos/create-match.dto';
import { UpdateMatchDto } from '../dtos/update-match.dto';

export interface IMatchRepository {
  create(data: CreateMatchDto): Promise<MatchEntity>;
  findMatchesByUserId(userId: string): Promise<MatchEntity[]>;
  findMatchById(id: string): Promise<MatchEntity | undefined>;
  updateMatchShots(data: UpdateMatchDto): Promise<MatchEntity>;
  deleteMatch(id: string): Promise<void>;
}
