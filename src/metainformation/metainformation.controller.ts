import {
  Body,
  Delete,
  Get,
  Param,
  Req,
  Controller,
  Post,
  HttpCode,
} from '@nestjs/common';

import {
  ApiUseTags,
  ApiOperation,
  ApiResponse,
  ApiImplicitParam,
} from '@nestjs/swagger';

import { PersonRole } from '../common/enums/person-role.enum';
import { MetainformationService } from './metainformation.service';
import { Metainformation } from './interfaces/metainformation.interface';
import { Field } from './interfaces/field.interface';
import { Qualification } from './interfaces/qualification.interface';
import { AcceptableRoles } from '../common/decorators/roles.decorator';
import { DeleteMetainformationDto } from './dto/delete-metainformation.dto';
import { ResponseMetainformationDto } from './dto/metainformation-response.dto';
import { MetainformationQualificationDto } from './dto/metainformation-qualification.dto';
import { MetainformationFieldsDto } from './dto/metainformation-fields.dto';
import { SendEmailDto } from './dto/send-email.dto';

@ApiUseTags('metainformation')
@Controller('metainformation')
export class MetainformationController {
  constructor(
    private readonly metainformationService: MetainformationService
  ) {  }

  @Get()
  @ApiOperation({ title: 'Get all metainformations' })
  @ApiResponse({ status: 200, type: ResponseMetainformationDto, isArray: true })
  fetchAll(@Req() req): Promise<Metainformation[]> {
    return this.metainformationService.findAll();
  }
  
  @Get('/fields')
  @ApiOperation({ title: 'Get field by id' })
  @ApiResponse({ status: 200 })
  fetchAllFields(): Promise<Field[]> {
    return this.metainformationService.findAllFields();
  }

  @Get('/fields/:id')
  @ApiOperation({ title: 'Get field by id' })
  @ApiResponse({ status: 200 })
  @ApiImplicitParam({ name: 'id' })
  fetchFieldsById(@Param('id') id: string): Promise<Field> {
    return this.metainformationService.findFieldById(id);
  }

  @Get('/job-titles')
  @ApiOperation({ title: 'Get qualification by id' })
  @ApiResponse({ status: 200 })
  fetchJobTitles(): Promise<Qualification[]> {
    return this.metainformationService.findAllQualifications();
  }

  @Get('/job-titles/:qualification')
  @ApiOperation({ title: 'Get all doctors' })
  @ApiResponse({ status: 200 })
  @ApiImplicitParam({ name: 'qualification' })
  fetchJobTitlesByQualification(@Param('qualification') qualification: string): Promise<Qualification[]> {
    return this.metainformationService.findJobTitlesByQualification(qualification);
  }

  @Get('/status/:status')
  @ApiOperation({ title: 'Get qualification by status and language' })
  @ApiResponse({ status: 200 })
  @ApiImplicitParam({ name: 'status' })
  @ApiImplicitParam({ name: 'language' })
  fetchByStatusAndLanguage(
    @Param('status') status: string,
  ): Promise<Qualification[]> {
    return this.metainformationService.findQualificationByStatus(status);
  }

  @Post('/job-titles')
  @ApiOperation({ title: 'Add a new qualificaton' })
  async createQualification(@Body() createDto: MetainformationQualificationDto[]): Promise<Qualification> {
    return this.metainformationService.addQualification(createDto);
  }

  @Post('/field')
  @ApiOperation({ title: 'Add a new field' })
  async createField(@Body() createDto: MetainformationFieldsDto[]): Promise<Field> {
    return this.metainformationService.addField(createDto);
  }

  @Post('/submit/send-email')
  @ApiOperation({ title: 'Submit' })
  @ApiResponse({ status: 200 })
  async sendEmail(@Body() sendDto: SendEmailDto): Promise<boolean> {
    return this.metainformationService.sendEmail(sendDto);
  }

  @Delete()
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @HttpCode(204)
  @ApiOperation({ title: 'Delete metainformation by id' })
  @ApiResponse({ status: 204, description: 'Successfuly deleted metainformation' })
  remove(@Body() id: DeleteMetainformationDto): Promise<Metainformation> {
    return this.metainformationService.remove(id);
  }
}
