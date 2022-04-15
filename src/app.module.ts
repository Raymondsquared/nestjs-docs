import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AdminModule } from './admin/admin.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [CatsModule, AdminModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
