import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    console.log(`Request class: ${request?.protocol}://${request?.hostname}${request?.url}`);
    next();
  }
}

export function logger(request: Request, response: Response, next: NextFunction): void {
  console.log(`Request function: ${request?.protocol}://${request?.hostname}${request?.url}`);
  next();
}
