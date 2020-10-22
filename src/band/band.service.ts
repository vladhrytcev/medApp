import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Band } from './interfaces/band.interface';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';

@Injectable()
export class BandService {
  constructor(
    @InjectModel('Band')
    private readonly bandRepository: Model<Band>
  ) {  }
  
  async findAll(): Promise<Band[]> {
    return this.bandRepository.find();
  }

  async findById(id: number): Promise<Band> {
    return this.bandRepository.findById(id);
  }

  async create(bandDto: CreateBandDto): Promise<Band> {
    const createBand = new this.bandRepository(bandDto);
    return await createBand.save();
  }

  async update(bandDto: UpdateBandDto, id: number): Promise<Band> {
    return await this.bandRepository.findByIdAndUpdate(id, bandDto);
  }

  async remove(id: number): Promise<Band> {
    return this.bandRepository.findByIdAndDelete(id);
  }
}
