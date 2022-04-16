import { Module, Global } from '@nestjs/common';
import { HttpService } from './http.service';

@Global()
@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class CatsModule {}
