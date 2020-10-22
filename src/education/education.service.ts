import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Education } from './education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>
  ) {  }

  async findAll(): Promise<Education[]> {
    return this.educationRepository.find();
  }

  findById(id: string | number): Promise<Education> {
    return this.educationRepository.findOne(id);
  }

  create(createEducationDto: CreateEducationDto): Promise<Education> {
    const education = { ...new Education(), ...createEducationDto };
    return this.educationRepository.save(education);
  }

  async updateById(id: string | number, updateEducationDto: UpdateEducationDto): Promise<Education> {
    await this.educationRepository.update(id, updateEducationDto);
    return this.findById(id);
  }

  async removeById(id: string | number): Promise<DeleteResult> {
    return this.educationRepository.delete(id);
  }
}
