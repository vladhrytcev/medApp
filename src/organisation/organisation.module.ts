import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganisationSchema } from './schemas/organisation.schema';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';
import { DepartmentService } from '../department/department.service';
// import { PersonService } from '../person/person.service';
import { DepartmentSchema } from '../department/schemas/department.schema';
import { PersonSchema } from '../person/schemas/person.schema';
import { UserService } from '../user/user.service';
import { AgencyService } from '../agency/agency.service';
import { PreferenceService } from '../preference/preference.service';
import { UserSchema } from '../user/schemas/user.schema';
import { AgencySchema } from '../agency/schemas/agency.schema';
import { PreferenceSchema } from '../preference/schemas/preference.schema';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [
    PersonModule,
    MongooseModule.forFeature([
      { name: 'person', schema: PersonSchema },
      { name: 'organisations', schema: OrganisationSchema },
      { name: 'departments', schema: DepartmentSchema },
      { name: 'users', schema: UserSchema },
      { name: 'agencies', schema: AgencySchema },
      { name: 'preferences', schema: PreferenceSchema },
    ]),
  ],
  providers: [
    DepartmentService,
    OrganisationService,
    UserService,
    AgencyService,
    PreferenceService
  ],
  exports: [OrganisationService],
  controllers: [OrganisationController],
})

export class OrganisationModule {  }
