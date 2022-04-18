import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { AuthGuard } from '../guards/auth.guard';

// export function Auth(...roles: Role[]) {
export function Auth(...roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
