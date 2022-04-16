import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  // @Inject('HTTP_OPTIONS')
  private readonly httpClient;

  constructor(@Optional() @Inject('HTTP_OPTIONS') httpClient: T) {
    this.httpClient = httpClient;
  }
}
