import {
  MiddlewareConsumer, Module, NestModule, RequestMethod,
} from '@nestjs/common';
import helmet from 'helmet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AdminModule } from './admin/admin.module';
import { AccountModule } from './account/account.module';
import { logger, LoggerMiddleware } from './middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { AccountController } from './account/account.controller';

@Module({
  imports: [CatsModule, AdminModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        // { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        // 'cats/(.*)',
      )
      // .forRoutes('cats');
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      // .forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
      .forRoutes(CatsController);

    consumer
      .apply(helmet(), logger)
      .forRoutes(AccountController);
  }
}
