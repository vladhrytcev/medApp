import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { PasswordService } from '../common/services/password.service';
import { EmailService } from '../common/services/email.service';
import { PersonSchema } from '../person/schemas/person.schema';
import { UserService } from '../user/user.service';
import { AgencyService } from '../agency/agency.service';
import { PreferenceService } from '../preference/preference.service';
import { UserSchema } from '../user/schemas/user.schema';
import { AgencySchema } from '../agency/schemas/agency.schema';
import { PreferenceSchema } from '../preference/schemas/preference.schema';
import { OrganisationSchema } from '../organisation/schemas/organisation.schema';
import { OrganisationService } from '../organisation/organisation.service';
import { DepartmentSchema } from '../department/schemas/department.schema';
import { DepartmentService } from '../department/department.service';
import { PersonModule } from '../person/person.module';
import { ForgottenPasswordSchema } from './schemas/forgottenpassword.schema';
import { EmailVerificationSchema } from './schemas/emailverification.schema';

@Module({
  imports: [
    PersonModule,
    MongooseModule.forFeature([
      { name: 'person', schema: PersonSchema },
      { name: 'users', schema: UserSchema },
      { name: 'agencies', schema: AgencySchema },
      { name: 'preferences', schema: PreferenceSchema },
      { name: 'organisations', schema: OrganisationSchema },
      { name: 'departments', schema: DepartmentSchema },
      { name: 'forgottenpasswords', schema: ForgottenPasswordSchema },
      { name: 'emailverifications', schema: EmailVerificationSchema }
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PasswordService,
    EmailService,
    UserService,
    AgencyService,
    PreferenceService,
    OrganisationService,
    DepartmentService
  ],
  exports: [AuthService]
})
export class AuthModule { }
