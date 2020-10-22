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
  ApiImplicitParam
} from '@nestjs/swagger';

import { PersonRole } from '../common/enums/person-role.enum';
import { ApplicantService } from './applicant.service';
import { Applicant } from './interfaces/applicant.interface';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { AcceptableRoles } from '../common/decorators/roles.decorator';
import { CreateApplicantDto } from './dto/create-applicant.dto';

@ApiUseTags('applicant')
@Controller('applicant')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class ApplicantController {
  constructor(
    private readonly applicantService: ApplicantService
  ) {  }

  @Get()
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get all applicants' })
  fetchAll(@Req() req): Promise<Applicant[]> {
    if (!req.user) {
      throw new HttpException('You not authorized', HttpStatus.BAD_REQUEST);
    }
    return this.applicantService.findAll();
  }

  @Get('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get applicant by id' })
  @ApiImplicitParam({ name: 'id' })
  fetchById(@Param('id') id: string): Promise<Applicant> {
    return this.applicantService.findById(id);
  }

  @Post()
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Create a new applicant' })
  async create(@Body() createDto: CreateApplicantDto): Promise<Applicant> {
    return this.applicantService.create(createDto);
  }

  @Put('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Update applicant by id' })
  @ApiImplicitParam({ name: 'id' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateApplicantDto
  ): Promise<Applicant> {
    return this.applicantService.update(updateDto, id);
  }

  @Delete('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @HttpCode(204)
  @ApiOperation({ title: 'Delete external job by list of id' })
  remove(@Param('id') id: string): Promise<Applicant> {
    return this.applicantService.remove(id);
  }
}
