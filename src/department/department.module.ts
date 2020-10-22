import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentSchema } from './schemas/department.schema';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { PersonSchema } from '../person/schemas/person.schema';
import { OrganisationSchema } from '../organisation/schemas/organisation.schema';
import { PersonService } from '../person/person.service';
import { UserService } from '../user/user.service';
import { AgencyService } from '../agency/agency.service';
import { OrganisationService } from '../organisation/organisation.service';
import { PreferenceService } from '../preference/preference.service';
import { UserSchema } from '../user/schemas/user.schema';
import { AgencySchema } from '../agency/schemas/agency.schema';
import { PreferenceSchema } from '../preference/schemas/preference.schema';
import { PasswordService } from '../common/services/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'departments', schema: DepartmentSchema },
      { name: 'person', schema: PersonSchema },
      { name: 'organisations', schema: OrganisationSchema },
      { name: 'users', schema: UserSchema },
      { name: 'agencies', schema: AgencySchema },
      { name: 'preferences', schema: PreferenceSchema },
    ])
  ],
  controllers: [DepartmentController],
  providers: [
    DepartmentService,
    PersonService,
    UserService,
    AgencyService,
    OrganisationService,
    PreferenceService,
    PasswordService
  ],
  exports: [DepartmentService]
})

export class DepartmentModule {  }
