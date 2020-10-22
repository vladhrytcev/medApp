import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { University } from './interfaces/university.interface';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { DeleteUniversityDto } from './dto/delete-university.dto';

@Injectable()
export class UniversityService {
  constructor(
    @InjectModel('University')
    private readonly universityRepository: Model<University>
  ) {  }

  async findAll(): Promise<University[]> {
    return this.universityRepository.find();
  }

  async findById(id: string | number): Promise<University> {
    return this.universityRepository.findById(id);
  }

  async create(universityDto: CreateUniversityDto): Promise<University> {
    const createUniversity = new this.universityRepository(universityDto);
    return await createUniversity.save();
  }

  async update(universityUpdateDto: UpdateUniversityDto, id: number | string): Promise<University> {
    return await this.universityRepository.findByIdAndUpdate(id, universityUpdateDto);
  }

  async remove(id: DeleteUniversityDto): Promise<University> {
    return await this.universityRepository.findByIdAndDelete(id);
  }
};
