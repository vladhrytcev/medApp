import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from '../person/schemas/person.schema';
import { AgencySchema } from './schemas/agency.schema';
import { AgencyController } from './agency.controller';
import { AgencyService } from './agency.service';
import { PersonService } from '../person/person.service';
import { UserSchema } from '../user/schemas/user.schema';
import { OrganisationSchema } from '../organisation/schemas/organisation.schema';
import { PreferenceSchema } from '../preference/schemas/preference.schema';
import { UserService } from '../user/user.service';
import { OrganisationService } from '../organisation/organisation.service';
import { PreferenceService } from '../preference/preference.service';
import { DepartmentSchema } from '../department/schemas/department.schema';
import { DepartmentService } from '../department/department.service';
import { PasswordService } from '../common/services/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'agencies',
        schema: AgencySchema
      }, 
      {
        name: 'person',
        schema: PersonSchema
      },
      {
        name: 'users',
        schema: UserSchema
      },
      {
        name: 'organisations',
        schema: OrganisationSchema
      },
      {
        name: 'preferences',
        schema: PreferenceSchema
      },
      {
        name: 'departments',
        schema: DepartmentSchema
      }
    ])
  ],
  controllers: [AgencyController],
  providers: [
    AgencyService,
    PersonService,
    UserService,
    OrganisationService,
    PreferenceService,
    DepartmentService,
    PasswordService
  ],
  exports: [AgencyService]
})

export class AgencyModule {  }
