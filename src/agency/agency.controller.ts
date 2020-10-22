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
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiImplicitParam,
} from '@nestjs/swagger';

import { PersonRole } from '../common/enums/person-role.enum';
import { AgencyService } from './agency.service';
import { ResponseAgencyInfoDto } from './dto/response-agency.dto';
import { Agency } from './interfaces/agency.interface';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { FilterAgencyDto } from './dto/filter-agency-type.dto';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { DeleteAgencyDto } from './dto/delete-agency.dto';
import { AcceptableRoles } from '../common/decorators/roles.decorator';

@ApiUseTags('agency')
@Controller('agency')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class AgencyController {
  constructor(
    private readonly agencyService: AgencyService,
  ) { }

  @Get()
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get all agencies' })
  @ApiResponse({ status: 200, type: ResponseAgencyInfoDto, isArray: true })
  fetchAll(@Req() req, @Query() query: FilterAgencyDto): Promise<Agency[]> {
    if (!req.user) {
      throw new HttpException('You not authorized', HttpStatus.BAD_REQUEST);
    }
    return this.agencyService.findAll();
  }

  @Get('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get agencies by id' })
  @ApiResponse({ status: 200, type: ResponseAgencyInfoDto })
  @ApiImplicitParam({ name: 'id' })
  fetchById(@Param('id') id: number): Promise<Agency> {
    return this.agencyService.findById(id);
  }

  @Post()
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Create a new agency' })
  async create(@Body() createAgencyDto: CreateAgencyDto, @Req() req: any): Promise<Agency> {
    const agency = await this.agencyService.findByName(createAgencyDto.name);
    if (agency) {
      throw new HttpException(`Agency with name ${createAgencyDto.name} already exist`, HttpStatus.BAD_REQUEST);
    }
    return this.agencyService.create(createAgencyDto);
  }

  @Put('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Update agency by id' })
  @ApiImplicitParam({ name: 'id' })
  async update(
    @Param('id') id: string,
    @Body() updateAgencyDto: UpdateAgencyDto,
  ): Promise<Agency> {
    return this.agencyService.update(updateAgencyDto, id);
  }

  @Delete()
  @AcceptableRoles(PersonRole.ADMIN)
  @HttpCode(204)
  @ApiOperation({ title: 'Delete agencies by id list' })
  @ApiResponse({ status: 204, description: 'Successfuly deleted agencies' })
  remove(@Body() id: DeleteAgencyDto): Promise<Agency[]> {
    return this.agencyService.remove(id);
  }
};
