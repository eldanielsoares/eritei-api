import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPackRepository } from '../repositories/pack.repository';
import { IPACK_REPOSITORY } from '../constants';
import { CreatePackDto } from '../dtos/create-pack.dto';
import { PackEntity } from '../entities/pack.entity';

@Injectable()
export class FindPackByIdUseCase {
  constructor(
    @Inject(IPACK_REPOSITORY) private readonly packRepository: IPackRepository,
  ) {}

  async execute(id: string): Promise<PackEntity> {
    const pack = await this.packRepository.findPackById(id);

    if (!pack) throw new NotFoundException('pack not found');

    return pack;
  }
}
