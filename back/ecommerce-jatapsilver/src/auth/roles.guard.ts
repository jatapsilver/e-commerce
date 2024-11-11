import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/roles/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){} 
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ])

    const request = context.switchToHttp().getRequest();
    const payload = request.payload;
  
    const hasRole = () => requiredRoles.some((role) => payload?.roles?.includes(role));

      const valid = payload && payload.roles && hasRole();

      if(!valid) {
        throw new ForbiddenException("You do not have permission to access this content")
      }
    return valid;
  }
}
