import { SetMetadata } from '@nestjs/common';
import { PersonRole } from '../enums/person-role.enum';

export const AcceptableRoles = (...roles: PersonRole[]) => SetMetadata('roles', roles);
