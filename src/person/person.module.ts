import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonSchema } from './schemas/person.schema';
import { AgencySchema } from '../agency/schemas/agency.schema';
import { PreferenceSchema } from '../preference/schemas/preference.schema';
import { UserSchema } from '../user/schemas/user.schema';
import { EmailService } from '../common/services/email.service';
import { UserService } from '../user/user.service';
import { AgencyService } from '../agency/agency.service';
import { PreferenceService } from '../preference/preference.service';
import { OrganisationSchema } from '../organisation/schemas/organisation.schema';
import { OrganisationService } from '../organisation/organisation.service';
import { DepartmentSchema } from '../department/schemas/department.schema';
import { DepartmentService } from '../department/department.service';
import { PasswordService } from '../common/services/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'organisations', schema: OrganisationSchema },
      { name: 'person', schema: PersonSchema },
      { name: 'users', schema: UserSchema },
      { name: 'agencies', schema: AgencySchema },
      { name: 'departments', schema: DepartmentSchema },
      { name: 'preferences', schema: PreferenceSchema },
    ])
  ],
  providers: [
    OrganisationService,
    PersonService,
    EmailService,
    UserService,
    AgencyService,
    PreferenceService,
    DepartmentService,
    PasswordService
  ],
  exports: [PersonService],
  controllers: [PersonController],
})
export class PersonModule { }
