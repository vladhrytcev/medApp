import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organisation } from './interfaces/organisation.interface';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { DepartmentService } from '../department/department.service';
import { PersonService } from '../person/person.service';
import { Department } from '../department/interfaces/department.interface';
import { Person } from '../person/interfaces/person.interface';

@Injectable()
export class OrganisationService {
  constructor(
    @Inject(forwardRef(() => PersonService))
    private personService: PersonService,
    private departmentService: DepartmentService,
    @InjectModel('person')
    private readonly personRepository: Model<Person>,
    @InjectModel('organisations')
    private readonly organisationRepository: Model<Organisation>,
    @InjectModel('departments')
    private readonly departmentRepository: Model<Department>
  ) {  }

  async findAll(): Promise<Organisation[]> {
    return this.organisationRepository.find()
      .populate({
        path: 'departments',
        model: this.departmentRepository,
        populate: {
          path: 'admins',
          model: this.personRepository
        }
      })
      .populate({
        path: 'departments',
        model: this.departmentRepository,
        populate: {
          path: 'users',
          model: this.personRepository
        }
      })
      .populate({
        path: 'departments',
        model: this.departmentRepository,
        populate: {
          path: 'org_id',
          model: this.organisationRepository
        }
      })
      .populate('contacts', this.personRepository)
      .exec();
  }

  async findById(id: string): Promise<Organisation> {
    return this.organisationRepository.findById(id)
      .populate({
        path: 'departments',
        model: this.departmentRepository,
        populate: {
          path: 'admins',
          model: this.personRepository
        }
      })
      .populate({
        path: 'departments',
        model: this.departmentRepository,
        populate: {
          path: 'users',
          model: this.personRepository
        }
      })
      .populate({
        path: 'departments',
        model: this.departmentRepository,
        populate: {
          path: 'org_id',
          model: this.organisationRepository
        }
      })
      .populate('contacts', this.personRepository)
      .exec();
  }

  async findByName(name: string): Promise<Organisation> {
    return this.organisationRepository.findOne({ name });
  }

  async findByCreatorId(id: string): Promise<Organisation[]> {
    return this.organisationRepository.find({ creatorId: id })
  }

  async create(createDto: CreateOrganisationDto, req): Promise<Organisation> {
    let departments,
        contacts,
        resolvedDepartments,
        resolvedPersons,
        departments_id,
        persons_id;
    if (createDto.departments) {
      departments = createDto.departments.map((item: any) => {
        return this.departmentService.findByName(item);
      })
      resolvedDepartments = await Promise.all(departments);
      departments_id = resolvedDepartments.map((item: any) => item._id);
    }
    if (createDto.contacts) {
      contacts = createDto.contacts.map(item => {
        return this.personService.findByEmail(item);
      })
      resolvedPersons = await Promise.all(contacts);
      persons_id = resolvedPersons.map((item: any) => item._id);
    }
    const creator_id = req.user._id;
    const createdOrg = new this.organisationRepository({
      ...createDto,
      departments: departments_id,
      contacts: persons_id,
      creatorId: creator_id
    });
    return await createdOrg.save();
  }

  async update(updateDto: UpdateOrganisationDto, id: string): Promise<Organisation> {
    return await this.organisationRepository.findByIdAndUpdate(id, updateDto);
  }

  async remove(id: string): Promise<Organisation> {
    return this.organisationRepository.findByIdAndDelete(id);
  }

  async removeByCreatorId(id: string): Promise<Organisation[]> {
    return this.organisationRepository.deleteMany({ creatorId: id })
  }
}
