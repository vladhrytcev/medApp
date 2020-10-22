import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { JobTitle } from "./interfaces/job-title.interface";
import { CreateJobTitleDto } from "./dto/create-job-title.dto";
import { UpdateJobTitleDto } from "./dto/update-job-title.dto";

@Injectable()
export class JobTitleService {
  constructor(
    @InjectModel('job-titles')
    private readonly jobTitleRepository: Model<JobTitle>
  ) {  }

  async findAll(): Promise<JobTitle[]> {
    return this.jobTitleRepository.find();
  }

  async findJobTitleByQualification(qualification: string): Promise<JobTitle> {
    return this.jobTitleRepository.findOne().select(qualification);
  }

  async findJobTitleById(id: string): Promise<JobTitle> {
    return await this.jobTitleRepository.find(id);
  }

  async create(createDto: CreateJobTitleDto): Promise<JobTitle> {
    const createdJobTitle = new this.jobTitleRepository(createDto);
    return await createdJobTitle.save();
  }

  async createJobTitle(createDto: UpdateJobTitleDto, id: string): Promise<JobTitle> {
    return await this.jobTitleRepository.findByIdAndUpdate(id, {
      [createDto.qualification]: {
        $push: {
          [createDto.language]: createDto.description
        }
      }
    })
  }

  async removeJobTitle(id: string): Promise<JobTitle> {
    return await this.jobTitleRepository.findByIdAndDelete(id);
  }
}