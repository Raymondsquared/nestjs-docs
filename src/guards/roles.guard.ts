import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const matchRoles = (expectedRoles: string[], actualRoles: string[]): boolean => {
  console.log({ expectedRoles, actualRoles });
  return false;
};

@Injectable()
export class RolesGuard implements CanActivate {
  private reflector: Reflector;

  constructor(reflector: Reflector) {
    this.reflector = reflector;
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    return matchRoles(roles, user?.roles);
  }
}
