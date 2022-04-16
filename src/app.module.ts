import {
  MiddlewareConsumer, Module, NestModule, RequestMethod,
} from '@nestjs/common';
// import { APP_FILTER } from '@nestjs/core';
import helmet from 'helmet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AdminModule } from './admin/admin.module';
import { AccountModule } from './account/account.module';
import { logger, LoggerMiddleware } from './middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { AccountController } from './account/account.controller';
// import { HttpExceptionFilter } from './filters/http-exception.filter';

@Module({
  imports: [CatsModule, AdminModule, AccountModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
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
