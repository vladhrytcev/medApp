import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from './interfaces/person.interface';
import { Agency } from '../agency/interfaces/agency.interface';
import { Organisation } from '../organisation/interfaces/organisation.interface';
import { PersonRole } from '../common/enums/person-role.enum';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { UpdatePartialPersonDto } from './dto/update-partial-person.dto';
import { Preference } from '../preference/interfaces/preference.interface';
import { User } from '../user/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { AgencyService } from '../agency/agency.service';
import { OrganisationService } from '../organisation/organisation.service';
import { PreferenceService } from '../preference/preference.service';
import { Department } from '../department/interfaces/department.interface';
import { PasswordService } from '../common/services/password.service';

@Injectable()
export class PersonService {
  constructor(
    private userService: UserService,
    private agencyService: AgencyService,
    private organisationService: OrganisationService,
    private preferenceService: PreferenceService,
    private passwordService: PasswordService,
    @InjectModel('person')
    private readonly personRepository: Model<Person>,
    @InjectModel('users')
    private readonly userRepository: Model<User>,
    @InjectModel('agencies')
    private readonly agencyRepository: Model<Agency>,
    @InjectModel('organisations')
    private readonly organisationRepository: Model<Organisation>,
    @InjectModel('preferences')
    private readonly preferenceRepository: Model<Preference>,
    @InjectModel('departments')
    private readonly departmentRepository: Model<Department>
  ) { }

  async findAll(): Promise<Person[]> {
    return this.personRepository.find()
      .populate({
        path: 'user_info',
        model: this.userRepository,
        populate: {
          path: 'preferences',
          model: this.preferenceRepository
      }  
      })
      .populate('agency_info.agency', this.agencyRepository)
      .populate('agency_info.preferences', this.preferenceRepository)
      .populate({
        path: 'org_info.organisation',
        model: this.organisationRepository,
        populate: {
          path: 'departments',
          model: this.departmentRepository
        }
      })
      .populate('org_info.preferences', this.preferenceRepository)
      .exec();
  }

  async findById(id: string): Promise<Person> {
    return this.personRepository.findById(id)
    .populate({
      path: 'user_info',
      model: this.userRepository,
      populate: {
        path: 'preferences',
        model: this.preferenceRepository
      }
    })
    .populate('agency_info.agency', this.agencyRepository)
    .populate('agency_info.preferences', this.preferenceRepository)
    .populate('org_info.organisation', this.organisationRepository)
    .populate('org_info.preferences', this.preferenceRepository)
    .exec();
  }

  async findByEmail(email: string): Promise<Person> {
    return this.personRepository.findOne({ email });
  }

  async findByRole(role: string): Promise<Person[]> {
    return this.personRepository.find({ role });
  }

  findByEmailAuth(email: string): Promise<Person> {
    return this.personRepository.findOne({ email });
  }

  findByUserId(id: string): Promise<Person> {
    return this.personRepository.findOne({ user_info: id });
  }

  async create(personDto: CreatePersonDto, req): Promise<Person> {
    let user_info, 
        agency, 
        agency_preferences,
        org_preferences,
        organisation = null;
    if (personDto.user_info && (personDto.role === PersonRole.ADMIN || personDto.role === PersonRole.ORG_ADMIN || personDto.role === PersonRole.USER)) {
      user_info = this.userService.create(personDto.user_info, req);
    } else if (personDto.agency_info && personDto.role === PersonRole.AGENCY) {
      agency = await this.agencyService.create(personDto.agency_info.agency);
      if (personDto.agency_info.preferences) {
        agency_preferences = await this.preferenceService.create(personDto.agency_info.preferences);
      }
    } else if (personDto.org_info && personDto.role === PersonRole.ORG_SUB) {
      organisation = await this.organisationService.create(personDto.org_info.organisation, req);
      if (personDto.org_info.preference) {
        org_preferences = await this.preferenceService.create(personDto.org_info.preference);
      }
    }
    const createdPerson = new this.personRepository({
      ...personDto,
      user_info,
      agency_info: { 
        agency: agency && agency._id,
        preferences: agency_preferences && agency_preferences._id
      },
      org_info: {
        organisation: organisation && organisation._id,
        preferences: org_preferences && org_preferences._id
      }
    });
    const person = await createdPerson.save();

    // this.emailService.personCreation({
    //   email: person.email,
    //   password: personDto.password,
    //   firstName: person.firstName,
    //   lastName: person.lastName,
    //   url: `${req.protocol}://${req.headers.host}/login`,
    // })
    return person;
  }

  async update(updateDto: UpdatePersonDto, id: string): Promise<Person> {
    return this.personRepository.findByIdAndUpdate(id, updateDto);
  }

  async updatePartial(updateDto: UpdatePartialPersonDto, id: string): Promise<Person> {
    await this.personRepository.findByIdAndUpdate(id, updateDto);
    return this.personRepository.findById(id);
  }

  async setPassword(email: string, newPassword: string): Promise<boolean> {
    const person = await this.findByEmail(email);
    if (!person) {
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    const newPasswordHash = await this.passwordService.generatePassword(newPassword);
    await this.updatePartial({ passwordHash: newPasswordHash }, person.id);
    return true;
  }

  async remove(id: string): Promise<Person> {
    const person = await this.personRepository.findById(id);
    if (person.user_info) {
      await this.userService.remove(person.user_info);
    }
    if (person.agency_info && person.agency_info.agency) {
      await this.agencyService.remove(person.agency_info.agency);
      if (person.agency_info.preferences) {
        await this.preferenceService.remove(person.agency_info.preference);
      }
    }
    if (person.org_info && person.org_info.organisation) {
      await this.organisationService.remove(person.org_info.organisation);
      if (person.org_info.preferences) {
        await this.preferenceService.remove(person.org_info.preferences);
      }
    }
    return this.personRepository.findByIdAndDelete(id);
  }

  isCanManipulatePerson(personRole: string, roleOnChange: string): boolean {
    if (roleOnChange === PersonRole.ADMIN) {
          return false;
        }
    return true;
  }
}
