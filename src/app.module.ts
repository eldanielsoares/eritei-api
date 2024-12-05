import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { UserCardModule } from './modules/user-card/user-card.module';
import { MatchModule } from './modules/match/match.module';
import { PackModule } from './modules/pack/pack.module';
@Module({
  imports: [UserModule, UserCardModule, MatchModule, PackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
