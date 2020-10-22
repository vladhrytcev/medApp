import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from '../person/interfaces/person.interface';
import { Agency } from './interfaces/agency.interface';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { DeleteAgencyDto } from './dto/delete-agency.dto';

@Injectable()
export class AgencyService {
  constructor(
    @InjectModel('agencies')
    private readonly agencyRepository: Model<Agency>,
    @InjectModel('person')
    private readonly personRepository: Model<Person>
  ) { }

  async findAll(): Promise<Agency[]> {
    console.log(this.personRepository)
    return this.agencyRepository.find().populate('person');
  }

  async findById(id: number): Promise<Agency> {
    return this.agencyRepository.findById(id);
  }

  async findByName(name: string): Promise<Agency> {
    return this.agencyRepository.findOne({ name });
  }

  async create(agencyDto: CreateAgencyDto): Promise<Agency> {
    const createdAgency = new this.agencyRepository(agencyDto);
    const agency = createdAgency.save();
    return agency;
  }

  async update(updateDto: UpdateAgencyDto, id: string): Promise<Agency> {
    return await this.agencyRepository.findByIdAndUpdate(id, updateDto);
  }

  async remove(ids: DeleteAgencyDto | string): Promise<Agency[]> {
    if (typeof ids === 'string') {
      return await this.agencyRepository.remove(ids);
    }
    const { id } = ids
    return await this.agencyRepository.remove({ _id: { $in: id } });
  }
}
