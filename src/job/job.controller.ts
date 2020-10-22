import {
  Body,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards,
  Controller,
  Post,
  HttpCode,
} from '@nestjs/common';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiImplicitParam
} from '@nestjs/swagger';

import { PersonRole } from '../common/enums/person-role.enum';
import { JobService } from './job.service';
import { ResponseJobDto } from './dto/response-job.dto';
import { Job } from './interfaces/job.interface';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { AcceptableRoles } from '../common/decorators/roles.decorator';
import { CreateJobDto } from './dto/create-job.dto';
import { DeleteJobDto } from './dto/delete-job.dto';

@ApiUseTags('job')
@Controller('job')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class JobController {
  constructor(
    private readonly jobService: JobService
  ) {  }

  @Get()
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get all jobs' })
  @ApiResponse({ status: 200, type: ResponseJobDto, isArray: true })
  fetchAll(@Req() req): Promise<Job[]> {
    if (!req.user) {
      throw new HttpException('You not authorized', HttpStatus.BAD_REQUEST);
    }
    return this.jobService.findAll();
  }

  @Get('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get jobs by id' })
  @ApiResponse({ status: 200, type: ResponseJobDto })
  @ApiImplicitParam({ name: 'id' })
  fetchById(@Param('id') id: string): Promise<Job> {
    return this.jobService.findById(id);
  }

  @Post()
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Create a new external job' })
  async create(@Body() createDto: CreateJobDto): Promise<Job> {
    return this.jobService.create(createDto);
  }

  @Put('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Update job by id' })
  @ApiImplicitParam({ name: 'id' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateJobDto
  ): Promise<Job> {
    return this.jobService.update(updateDto, id);
  }

  @Delete()
  @AcceptableRoles(PersonRole.ADMIN)
  @HttpCode(204)
  @ApiOperation({ title: 'Delete jobs by list of id' })
  remove(@Body() id: DeleteJobDto): Promise<Job[]> {
    return this.jobService.remove(id);
  }
}
