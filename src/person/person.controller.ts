import {
  Body,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
  Controller,
  Post,
  Put,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';

import { PersonRole } from '../common/enums/person-role.enum';
import { PersonService } from './person.service';
import { ResponsePersonInfoDto } from './dto/response-person.dto';
import { UpdatePartialPersonDto } from './dto/update-partial-person.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { FilterPersonDto } from './dto/filter-person-type.dto';
import { DeleteResponseDto } from '../common/dto/delete.response.dto';
import { Person } from './interfaces/person.interface';
import { CreatePersonDto } from './dto/create-person.dto';
import { AcceptableRoles } from '../common/decorators/roles.decorator';
import { EmailService } from '../email/email.service';
import { UpdatePersonDto } from './dto/update-person.dto';
@ApiUseTags('person')
@Controller('person')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly emailService: EmailService,
  ) { }

  @Get()
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get all persons' })
  @ApiResponse({ status: 200, type: ResponsePersonInfoDto, isArray: true })
  fetchAll(@Req() req, @Query() query: FilterPersonDto): Promise<Person[]> {
    if (!req.user) {
      throw new HttpException('You not authorized', HttpStatus.BAD_REQUEST);
    }
    return this.personService.findAll();
  }

  @Get('/me')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get person by token' })
  @ApiResponse({ status: 200, type: ResponsePersonInfoDto })
  fetchPersonByToken(@Req() req): Promise<Person> {
    if (!req.person) {
      throw new HttpException('You not authorized', HttpStatus.BAD_REQUEST);
    }
    const { id } = req.person;
    return this.personService.findById(id);
  }

  @Get('/email')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get person by email' })
  @ApiResponse({ status: 200, type: ResponsePersonInfoDto })
  fetchPersonByEmail(@Query('email') email: string): Promise<Person> {
    const person = this.personService.findByEmail(email);
    if (!person) {
      throw new HttpException('Can\'t find person with this email', HttpStatus.BAD_REQUEST);
    }
    return person;
  }

  @Get('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get person by id' })
  @ApiResponse({ status: 200, type: ResponsePersonInfoDto })
  async fetchPersonById(@Param('id') personId: string): Promise<Person> {
    const person = await this.personService.findById(personId);
    if (!person) {
      throw new HttpException('Can\'t find person with this id', HttpStatus.BAD_REQUEST);
    }
    return person;
  }

  @Get('/role')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get person by role' })
  @ApiResponse({ status: 200, type: ResponsePersonInfoDto })
  async fetchPersonByRole(@Query('role') personRole: string): Promise<Person[]> {
    const persons = await this.personService.findByRole(personRole);
    if (!persons) {
      throw new HttpException('Can\'t find persons with this role', HttpStatus.BAD_REQUEST);
    }
    return persons;
  }

  @Post()
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Create person' })
  @ApiResponse({ status: 200, type: ResponsePersonInfoDto })
  async create(@Req() req, @Body() personDto: CreatePersonDto): Promise<Person> {
    const person = await this.personService.findByEmail(personDto.email);
    if (person) {
      throw new HttpException('Person with this email already existing', HttpStatus.BAD_REQUEST);
    }
    const createdUser =  this.personService.create(personDto, req);
    if (createdUser) {
      this.emailService.sendEmail(createdUser['_id']);
    }
    return createdUser;
  }

  @Put('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Update an existing person' })
  @ApiResponse({ status: 200, type: ResponsePersonInfoDto })
  async update(
    @Req() req,
    @Body() personDto: UpdatePersonDto,
    @Param('id') personId: string
  ): Promise<Person> {
    const person = await this.personService.findById(personId);
    if (!person) {
      throw new HttpException('Can\'t find person with this id', HttpStatus.BAD_REQUEST);
    }
    return this.personService.update(personDto, personId);
  }


  @Patch('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Partial update an existing person' })
  @ApiResponse({ status: 200, type: ResponsePersonInfoDto })
  async updatePartial(
    @Req() req,
    @Body() personDto: UpdatePartialPersonDto,
    @Param('id') personId: string,
  ): Promise<Person> {
    const person = await this.personService.findById(personId);
    if (!person) {
      throw new HttpException('Can\'t find person with this id', HttpStatus.BAD_REQUEST);
    }
    return this.personService.updatePartial(personDto, personId);
  }

  @Delete('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Delete person' })
  @ApiResponse({ status: 200, description: 'Successfully deleted person' })
  async remove(
    @Param('id') personId: string,
  ): Promise<DeleteResponseDto> {
    const person = await this.personService.findById(personId);
    if (!person) {
      throw new HttpException('Can\'t find person with this id', HttpStatus.BAD_REQUEST);
    }
    await this.personService.remove(personId);
    return { success: true, id: personId };
  }
}
