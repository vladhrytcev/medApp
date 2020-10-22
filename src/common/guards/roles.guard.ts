import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PersonRole } from '../enums/person-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<PersonRole[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const person = request.user;
    if (person && person.role && person.role === PersonRole.ADMIN) {
      return true;
    }
    const success = person && person.role && roles.includes(person.role);
    return success;
  }
}
