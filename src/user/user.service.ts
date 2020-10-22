import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from '../person/interfaces/person.interface';
import { User } from './interfaces/user.interface';
import { Preference } from '../preference/interfaces/preference.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PreferenceService } from '../preference/preference.service';

@Injectable()
export class UserService {
  constructor(
    private preferenceService: PreferenceService,
    @InjectModel('person')
    private readonly personService: Model<Person>,
    @InjectModel('users')
    private readonly userRepository: Model<User>,
    @InjectModel('preferences')
    private readonly preferenceRepository: Model<Preference>
  ) {  }

  async create(userDto: CreateUserDto, req): Promise<User> {
    let preferences = null;
    if (userDto.preferences) {
      preferences = await this.preferenceService.create(userDto.preferences);
    };
    const createdUser = new this.userRepository({
      ...userDto,
      preferences
    });
    const user = await createdUser.save();
    return user;
  }

  async update(updateDto: UpdateUserDto, id: string): Promise<User> {
    return this.userRepository.findByIdAndUpdate(id, updateDto);
  }

  async remove(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (this.personService.findByUserId(id)) {
      if (user.preferences) {
        await this.preferenceService.remove(user.preferences);
      }
      return this.userRepository.findByIdAndDelete(id);  
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
      .populate('preferences', this.preferenceRepository)
      .exec();
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findById(id)
      .populate('preferences', this.preferenceRepository)
      .exec();
  }
}
