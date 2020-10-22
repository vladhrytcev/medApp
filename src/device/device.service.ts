import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceInterface } from './interfaces/device.interface';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel('devices') 
    private readonly deviceRepository: Model<DeviceInterface>
  ) {  }

  async findAll(): Promise<DeviceInterface[]> {
    return this.deviceRepository.find().exec();
  }

  async findById(customerId: string): Promise<DeviceInterface> {
    return this.deviceRepository.findOne({ customerId }).exec();
  }

  async create(createDto: DeviceInterface): Promise<DeviceInterface> {
    if (createDto.projectId && createDto.customerId && createDto.token) {
      const createdDevice = new this.deviceRepository({
        ...createDto
      });
      return await createdDevice.save();
    } else {
      throw new HttpException('Customer id or project id does not exist', HttpStatus.NOT_FOUND);
    }
  }

  async remove(projectId: string, customerId: string): Promise<any> {
    return await this.deviceRepository.deleteOne({ projectId, customerId }).exec();
  }
}
