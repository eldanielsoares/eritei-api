import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { UserCardModule } from './modules/user-card/user-card.module';
@Module({
  imports: [UserModule, UserCardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
