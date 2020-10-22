import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PreferenceService } from '../preference/preference.service';
import { PreferenceSchema } from '../preference/schemas/preference.schema';
import { PersonSchema } from '../person/schemas/person.schema';
import { PersonService } from '../person/person.service';
import { AgencyService } from '../agency/agency.service';
import { OrganisationService } from '../organisation/organisation.service';
import { AgencySchema } from '../agency/schemas/agency.schema';
import { OrganisationSchema } from '../organisation/schemas/organisation.schema';
import { DepartmentSchema } from '../department/schemas/department.schema';
import { DepartmentService } from '../department/department.service';
import { PasswordService } from '../common/services/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users', schema: UserSchema },
      { name: 'person', schema: PersonSchema },
      { name: 'preferences', schema: PreferenceSchema },
      { name: 'agencies', schema: AgencySchema },
      { name: 'organisations', schema: OrganisationSchema },
      { name: 'departments', schema: DepartmentSchema }
    ])
  ],
  providers: [
    UserService,
    PreferenceService,
    PersonService,
    AgencyService,
    OrganisationService,
    DepartmentService,
    PasswordService
  ],
  exports: [UserService],
  controllers: [UserController]
})

export class UserModule {  }