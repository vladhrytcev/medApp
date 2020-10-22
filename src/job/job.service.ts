import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './interfaces/job.interface';
import { Organisation } from '../organisation/interfaces/organisation.interface';
import { Person } from '../person/interfaces/person.interface'
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { DeleteJobDto } from './dto/delete-job.dto';
// import { EmailService } from '../common/services/email.service';
import { JobState } from '../common/enums/job-state.enum';
import { JobGateway } from './job.gateway';
import { getGeneratedHash } from '../common/helpers/getGeneratedHash';
import { ApplicantService } from '../applicant/applicant.service';
import { OrganisationService } from '../organisation/organisation.service';
import { DepartmentService } from '../department/department.service';
import { Applicant } from '../applicant/interfaces/applicant.interface';
import { Department } from '../department/interfaces/department.interface';
import { PersonService } from '../person/person.service';

@Injectable()
export class JobService {
  constructor(
    private jobGateway: JobGateway,
    // private emailService: EmailService,
    private personService: PersonService,
    private applicantService: ApplicantService,
    private organisationService: OrganisationService,
    private departmentService: DepartmentService,
    @InjectModel('applicants')
    private readonly applicantRepository: Model<Applicant>,
    @InjectModel('jobs')
    private readonly jobRepository: Model<Job>,
    @InjectModel('organisations')
    private readonly organisationRepository: Model<Organisation>,
    @InjectModel('departments')
    private readonly departmentRepository: Model<Department>,
    @InjectModel('person')
    private readonly personRepository: Model<Person>
  ) {  }

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find()
      .populate({
        path: 'applicants',
        model: this.applicantRepository,
        populate: {
          path: 'user',
          model: this.personRepository
        }
      })
      .populate({
        path: 'organisation',
        model: this.organisationRepository,
        populate: {
          path: 'departments',
          model: this.departmentRepository
        }
      })
      .populate({
        path: 'organisation',
        model: this.organisationRepository,
        populate: {
          path: 'contacts',
          model: this.personRepository
        }
      })
      .populate('orig_dept', this.departmentRepository)
      .populate('orig_submission', this.personRepository)
      .exec();
  }

  async findById(id: string): Promise<Job> {
    return this.jobRepository.findById(id)
    .populate({
      path: 'applicants',
      model: this.applicantRepository,
      populate: {
        path: 'user',
        model: this.personRepository
      }
    })
    .populate({
      path: 'organisation',
      model: this.organisationRepository,
      populate: {
        path: 'departments',
        model: this.departmentRepository
      }
    })
    .populate({
      path: 'organisation',
      model: this.organisationRepository,
      populate: {
        path: 'contacts',
        model: this.personRepository
      }
    })
    .populate('orig_dept', this.departmentRepository)
    .populate('orig_submission', this.personRepository)
      .exec();
  }

  async findByTitle(title: string): Promise<Job> {
    return this.jobRepository.findOne({ title });
  }

  async create(createDto: CreateJobDto): Promise<Job> {
    const currentDate = (new Date()).valueOf().toString();
    const jobID = getGeneratedHash(createDto.title, currentDate);
    if (createDto.applicants && (
      createDto.state === JobState.EXTERNAL_ADV ||
      createDto.state === JobState.EXTERNAL_FILL ||
      createDto.state === JobState.EXTERNAL_NOADV ||
      createDto.state === JobState.EXTERNAL_SEL
    )) {
      let department,
          organisation,
          applicants,
          resolvedApplicant,
          applicant_id;
      applicants = createDto.applicants.map(item => {
        return this.applicantService.create(item);
      });
      if (createDto.organisation) {
        organisation = await this.organisationService.findById(createDto.organisation);
      }
      if (createDto.orig_dept) {
        department = await this.departmentService.findByName(createDto.orig_dept);
      }
      resolvedApplicant = await Promise.all(applicants);
      applicant_id = resolvedApplicant.map((item: any) => item._id);
      const createdJob = new this.jobRepository({
        ...createDto,
        applicants: resolvedApplicant && applicant_id,
        organisation: organisation && organisation._id,
        orig_dept: department && department._id,
        jobID
      })
      const job = await createdJob.save();
      return job  
    } else if (createDto.applicants && (
      createDto.state === JobState.INTERNAL_ADV ||
      createDto.state === JobState.INTERNAL_FILL
    )) {
      let applicants,
          persons,
          resolvedApplicant,
          resolvedPersons,
          applicant_id,
          persons_id;
      applicants = createDto.applicants.map(item => {
        return this.applicantService.create(item);
      });
      if (createDto.orig_submission) {
        persons = createDto.orig_submission.map(item => {
          return this.personService.findByEmail(item);
        })
      }
      resolvedPersons = await Promise.all(persons);
      resolvedApplicant = await Promise.all(applicants);
      applicant_id = resolvedApplicant.map((item: any) => item._id);
      persons_id = resolvedPersons.map((item: any) => item._id);
      const createdJob = new this.jobRepository({
        ...createDto,
        applicants: createDto.applicants && applicant_id,
        orig_submission: createDto.orig_submission && persons_id,
        jobID
      })
      const job = await createdJob.save();
      return job;
    }
  }

  async update(updateDto: UpdateJobDto, id: string): Promise<Job> {
    await this.jobRepository.findByIdAndUpdate(id, updateDto);
    return this.jobRepository.findById(id);
  }

  async changeStatus(status: JobState, id: string): Promise<Job> {
    await this.jobRepository.findByIdAndUpdate(id, { status });
    return this.jobRepository.findById(id);
  }

  async remove(id: DeleteJobDto): Promise<Job[]> {
    const { ids } = id;
    ids.forEach(async item => {
      const job = await this.jobRepository.findById(item);
      job.applicants.forEach(item => {
          this.applicantService.remove(item);
      })
    });
    const deletedJob = await this.jobRepository.deleteMany({ _id: { $in: ids } });
    if (id.socketId) {
      this.jobGateway.server.sockets.to(id.socketId).emit('log', 'external jobs deleted');
    }
    return deletedJob;
  }
}
