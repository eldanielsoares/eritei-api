import { UserEntity } from 'src/modules/user/entities/user.entity';

export class UserCardEntity {
  id: string;
  userId: string;
  cardId: string;
  createdAt: Date;
  updatedAt: Date;
  // card      Card     @relation(fields: [cardId], references: [id])
}
