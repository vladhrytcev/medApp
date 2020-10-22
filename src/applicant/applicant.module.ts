import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicantService } from './applicant.service';
import { ApplicantController } from './applicant.controller';
import { ApplicantSchema } from './schemas/applicant.schema';
import { PersonService } from '../person/person.service';
import { AgencyService } from '../agency/agency.service';
import { UserService } from '../user/user.service';
import { OrganisationService } from '../organisation/organisation.service';
import { PreferenceService } from '../preference/preference.service';
import { UserSchema } from '../user/schemas/user.schema';
import { AgencySchema } from '../agency/schemas/agency.schema';
import { OrganisationSchema } from '../organisation/schemas/organisation.schema';
import { PreferenceSchema } from '../preference/schemas/preference.schema';
import { PersonSchema } from '../person/schemas/person.schema';
import { DepartmentService } from '../department/department.service';
import { DepartmentSchema } from '../department/schemas/department.schema';
import { PasswordService } from '../common/services/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'applicants', schema: ApplicantSchema },
      { name: 'person', schema: PersonSchema },
      { name: 'users', schema: UserSchema },
      { name: 'agencies', schema: AgencySchema },
      { name: 'organisations', schema: OrganisationSchema },
      { name: 'preferences', schema: PreferenceSchema },
      { name: 'departments', schema: DepartmentSchema }
    ])
  ],
  providers: [
    ApplicantService,
    PersonService,
    AgencyService,
    UserService,
    OrganisationService,
    PreferenceService,
    DepartmentService,
    PasswordService
  ],
  exports: [ApplicantService],
  controllers: [ApplicantController]
})

export class ApplicantModule {  }