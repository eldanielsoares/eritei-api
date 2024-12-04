import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | undefined>;
  findByEmail(email: string): Promise<UserEntity | undefined>;
  delete(id: string): Promise<void>;
}
