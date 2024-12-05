import { CreateUserDTO } from 'src/modules/user/dtos/create-user.dto';
import { MatchEntity } from '../entities/match.entity';
import { IMatchRepository } from './match.repository';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from '../dtos/create-match.dto';
import { UpdateMatchDto } from '../dtos/update-match.dto';

@Injectable()
export class MatchPrismaRepository implements IMatchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMatchDto): Promise<MatchEntity> {
    const match = await this.prisma.match.create({ data });

    return match;
  }

  async findMatchesByUserId(userId: string): Promise<MatchEntity[]> {
    return this.prisma.match.findMany({
      where: { userId },
    });
  }

  async findMatchById(id: string): Promise<MatchEntity> {
    return this.prisma.match.findUnique({
      where: { id },
    });
  }

  async updateMatchShots(data: UpdateMatchDto): Promise<MatchEntity> {
    const { cardId, matchId } = data;

    const card = await this.prisma.card.findUnique({
      where: { id: cardId },
    });

    const match = await this.prisma.match.update({
      where: { id: matchId },
      data: {
        shots: {
          increment: card.shots ?? 1,
        },
      },
    });

    return match;
  }

  async deleteMatch(id: string): Promise<void> {
    await this.prisma.match.delete({ where: { id } });
  }
}
