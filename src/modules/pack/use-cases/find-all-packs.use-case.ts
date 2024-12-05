import { Inject, Injectable } from '@nestjs/common';
import { IPackRepository } from '../repositories/pack.repository';
import { IPACK_REPOSITORY } from '../constants';
import { CreatePackDto } from '../dtos/create-pack.dto';
import { PackEntity } from '../entities/pack.entity';

@Injectable()
export class FindAllPacksUseCase {
  constructor(
    @Inject(IPACK_REPOSITORY) private readonly packRepository: IPackRepository,
  ) {}

  execute(): Promise<PackEntity[]> {
    return this.packRepository.findAllPacks();
  }
}
