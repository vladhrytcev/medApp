import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Preference } from './interfaces/preference.interface';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectModel('preferences')
    private readonly preferenceRepository: Model<Preference>
  ) {  }

  async findAll(): Promise<Preference[]> {
    return await this.preferenceRepository.find();
  }

  async findById(id: string): Promise<Preference> {
    return await this.preferenceRepository.findById(id);
  }

  async create(createDto: CreatePreferenceDto): Promise<Preference> {
    const createdPreferences = new this.preferenceRepository(createDto);
    const preferences = await createdPreferences.save();
    return preferences;
  }

  async update(updateDto: UpdatePreferenceDto, id: string): Promise<Preference> {
    return await this.preferenceRepository.findByIdAndUpdate(id, updateDto);
  }

  async remove(id: any): Promise<Preference> {
    return this.preferenceRepository.findByIdAndDelete(id);
  }
}