import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;

    return data ? user?.[data] : user;
  },
);
