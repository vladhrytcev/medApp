import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './schemas/job.schema';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { EmailService } from '../common/services/email.service';
import { JobGateway } from './job.gateway';
import { OrganisationSchema } from '../organisation/schemas/organisation.schema';
import { ApplicantSchema } from '../applicant/schemas/applicant.schema';
import { ApplicantService } from '../applicant/applicant.service';
import { OrganisationService } from '../organisation/organisation.service';
import { DepartmentService } from '../department/department.service';
import { DepartmentSchema } from '../department/schemas/department.schema';
import { PersonService } from '../person/person.service';
import { AgencyService } from '../agency/agency.service';
import { UserService } from '../user/user.service';
import { PreferenceService } from '../preference/preference.service';
import { PersonSchema } from '../person/schemas/person.schema';
import { UserSchema } from '../user/schemas/user.schema';
import { AgencySchema } from '../agency/schemas/agency.schema';
import { PreferenceSchema } from '../preference/schemas/preference.schema';
import { PasswordService } from '../common/services/password.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'jobs', schema: JobSchema },
    { name: 'applicants', schema: ApplicantSchema },
    { name: 'organisations', schema: OrganisationSchema },
    { name: 'departments', schema: DepartmentSchema },
    { name: 'person', schema: PersonSchema },
    { name: 'users', schema: UserSchema },
    { name: 'agencies', schema: AgencySchema },
    { name: 'preferences', schema: PreferenceSchema }
  ])],
  controllers: [JobController],
  providers: [
    JobService,
    JobGateway,
    EmailService,
    ApplicantService,
    OrganisationService,
    DepartmentService,
    PersonService,
    AgencyService,
    UserService,
    PreferenceService,
    PasswordService
  ],
  exports: [JobService]
})

export class JobModule {  }
