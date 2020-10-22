import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from './interfaces/department.interface';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Person } from '../person/interfaces/person.interface';
import { Organisation } from '../organisation/interfaces/organisation.interface';
import { PersonService } from '../person/person.service';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject(forwardRef(() => PersonService))
    private personService: PersonService,
    @InjectModel('departments')
    private readonly departmentRepository: Model<Department>,
    @InjectModel('person')
    private readonly personRepository: Model<Person>,
    @InjectModel('organisations')
    private readonly organisationRepository: Model<Organisation>
  ) {  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find()
      .populate('admins', this.personRepository)
      .populate('users', this.personRepository)
      .populate('org_id', this.organisationRepository)
      .exec();
  }

  async findById(id: string | number): Promise<Department> {
    return this.departmentRepository.findById(id)
      .populate('admin', this.personRepository)
      .populate('users', this.personRepository)
      .populate('org_id', this.organisationRepository)
      .exec();
  }

  async findByName(name: string): Promise<Department> {
    return this.departmentRepository.findOne({ name });
  }

  async create(createDto: CreateDepartmentDto, req): Promise<Department> {
    let admins,
        users,
        resolvedAdmins,
        resolvedUsers,
        admins_id,
        users_id,
        org_id;
    if (createDto.admins && createDto.admins.length) {
      admins = createDto.admins.map((item: any) => {
        return this.personService.findByEmail(item);
      })
      resolvedAdmins = await Promise.all(admins);
      admins_id = resolvedAdmins.map((item: any) => item._id);
    }
    if (createDto.users && createDto.users.length) {
      users = createDto.users.map((item: any) => {
        return this.personService.findByEmail(item);
      })
      resolvedUsers = await Promise.all(users);
      users_id = resolvedUsers.map((item: any) => item._id);
    }
    if (createDto.org_id) {
      org_id = createDto.org_id;
    }
    const createDepartment = new this.departmentRepository({
      ...createDto,
      admins: admins_id,
      users: users_id,
      org_id,
    });
    await this.organisationRepository.findByIdAndUpdate(org_id, {
      $push: { departments: createDepartment._id }
    })
    return await createDepartment.save();
  }

  async update(departamntUpdateDto: UpdateDepartmentDto, id: string): Promise<Department> {
    return await this.departmentRepository.findByIdAndUpdate(id, departamntUpdateDto);
  }

  async remove(id: string): Promise<Department> {
    const { org_id } = await this.departmentRepository.findById(id);
    await this.organisationRepository.findByIdAndUpdate(org_id, {
      $pull: { departments: id }
    })
    return await this.departmentRepository.findByIdAndDelete(id);
  }
};
