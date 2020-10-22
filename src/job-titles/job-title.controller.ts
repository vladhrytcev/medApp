import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from "@nestjs/swagger";
import { Controller, Get, Body, Post, Param, Delete, HttpCode, HttpException, HttpStatus } from "@nestjs/common";
import { JobTitleService } from "./job-title.service";
import { JobTitle } from "./interfaces/job-title.interface";
import { CreateJobTitleDto } from './dto/create-job-title.dto';
import { UpdateJobTitleDto } from "./dto/update-job-title.dto";

@ApiUseTags('job-title')
@Controller('job-title')
export class JobTitleController {
  constructor(
    private readonly jobTitleService: JobTitleService
  ) {  }

  @Get()
  @ApiOperation({ title: 'Get all job titles' })
  @ApiResponse({ status: 200 })
  fetchAll(): Promise<JobTitle[]> {
    return this.jobTitleService.findAll();
  }

  @Get('/qualification/:qualification')
  @ApiOperation({ title: 'Get job titles by qualification' })
  @ApiResponse({ status: 200, isArray: true })
  @ApiImplicitParam({ name: 'qualification' })
  fetchAllByQualification(@Param('qualification') qualificaiton: string): Promise<JobTitle> {
    return this.jobTitleService.findJobTitleByQualification(qualificaiton);
  }

  @Post()
  @ApiOperation({ title: 'Create job title' })
  @ApiResponse({ status: 200 })
  async createMigration(@Body() createDto: CreateJobTitleDto): Promise<JobTitle> {
    return this.jobTitleService.create(createDto);
  }

  @Post('/:id')
  @ApiOperation({ title: 'Add a new job title' })
  @ApiResponse({ status: 200 })
  async create(@Body() createDto: UpdateJobTitleDto, @Param('id') id: string): Promise<JobTitle> {
    return this.jobTitleService.createJobTitle(createDto, id);
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ title: 'Delete the job title by id' })
  @ApiResponse({ status: 204, description: 'Successfully deleted metainformation' })
  async remove(@Param('id') id: string): Promise<any> {
    const jobTitle = await this.jobTitleService.findJobTitleById(id);
    if (!jobTitle) {
      throw new HttpException('Can\'t find a job title with this id', HttpStatus.BAD_REQUEST);
    }
    await this.jobTitleService.removeJobTitle(id);
    return {
      success: true,
      id
    }
  }
}