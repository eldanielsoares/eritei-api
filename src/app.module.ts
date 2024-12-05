import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { UserCardModule } from './modules/user-card/user-card.module';
import { MatchModule } from './modules/match/match.module';
@Module({
  imports: [UserModule, UserCardModule, MatchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
