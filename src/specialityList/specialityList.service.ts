import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Speciality } from './interfaces/speciality.interface';
import { SpecialityDto } from './dto/specialityList.dto';

@Injectable()
export class SpecialityService {
  constructor(
    @InjectModel('specialities')
    private readonly specialityRepository: Model<Speciality>
  ) {  }

  async findAll(): Promise<Speciality> {
    return await this.specialityRepository.find();
  }

  async create(createDto: SpecialityDto): Promise<Speciality> {
    const createdSpeciality = new this.specialityRepository(createDto);
    const speciality = await createdSpeciality.save();
    return speciality;
  }
  
  async remove (id: any): Promise<Speciality> {
    return this.specialityRepository.findByIdAndDelete(id);
  }
}
