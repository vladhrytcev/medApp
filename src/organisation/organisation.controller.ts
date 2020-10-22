import {
  Body,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
  Controller,
  Post,
  HttpCode,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
  ApiImplicitParam,
} from '@nestjs/swagger';

import { PersonRole } from '../common/enums/person-role.enum'
import { OrganisationService } from './organisation.service';
import { ResponseOrganisationInfoDto } from './dto/response-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { FilterOrganisationDto } from './dto/filter-organisation-type.dto';
import { AcceptableRoles } from '../common/decorators/roles.decorator';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { Organisation } from './interfaces/organisation.interface';

@ApiUseTags('organisation')
@Controller('organisation')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class OrganisationController {
  constructor(
    private readonly organisationService: OrganisationService,
  ) { }

  @Get()
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Get all organisations' })
  @ApiResponse({ status: 200, type: ResponseOrganisationInfoDto, isArray: true })
  fetchAll(@Req() req, @Query() query: FilterOrganisationDto): Promise<Organisation[]> {
    if (!req.user) {
      throw new HttpException('You not authorized', HttpStatus.BAD_REQUEST);
    }
    return this.organisationService.findAll();
  }

  @Get('/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Get organisation by id' })
  @ApiResponse({ status: 200, type: ResponseOrganisationInfoDto })
  @ApiImplicitParam({ name: 'id' })
  fetchById(@Param('id') id: string): Promise<Organisation> {
    return this.organisationService.findById(id);
  }

  @Get('/by-creator/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Get organisation by creator\'s id '})
  @ApiResponse({ status: 200, type: ResponseOrganisationInfoDto, isArray: true })
  @ApiImplicitParam({ name: 'id' })
  fetchByCreatorId(@Param('id') id: string): Promise<Organisation[]> {
    return this.organisationService.findByCreatorId(id)
  }

  @Post()
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Create a new organisation' })
  async create(@Body() createOrganisationDto: CreateOrganisationDto, @Req() req): Promise<Organisation> {
    const org = await this.organisationService.findByName(createOrganisationDto.name);
    if (org) {
      throw new HttpException(`Organisation with name ${createOrganisationDto.name} already exist`, HttpStatus.BAD_REQUEST);
    }
    return this.organisationService.create(createOrganisationDto, req);
  }

  @Put('/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Update organisation by id' })
  @ApiImplicitParam({ name: 'id' })
  async update(
    @Param('id') id: string,
    @Body() updateOrganisationDto: UpdateOrganisationDto,
  ): Promise<Organisation> {
    return this.organisationService.update(updateOrganisationDto, id)
  }

  @Delete('/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @HttpCode(204)
  @ApiOperation({ title: 'Delete organisation by id' })
  @ApiImplicitParam({ name: 'id' })
  @ApiResponse({ status: 204, description: 'Successfuly deleted organisation' })
  remove(
    @Param('id') id: string
  ) : Promise<Organisation> {
    return this.organisationService.remove(id);
  }
}
