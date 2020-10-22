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
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
  ApiImplicitParam,
} from '@nestjs/swagger';

import { PersonRole } from '../common/enums/person-role.enum'
import { PreferenceService } from './preference.service';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { AcceptableRoles } from '../common/decorators/roles.decorator';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { Preference } from './interfaces/preference.interface';

@ApiUseTags('preference')
@Controller('preference')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class PreferenceController {
  constructor(
    private readonly preferenceService: PreferenceService,
  ) { }

  @Get()
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Get all preferences' })
  fetchAll(@Req() req): Promise<Preference[]> {
    if (!req.user) {
      throw new HttpException('You not authorized', HttpStatus.BAD_REQUEST);
    }
    return this.preferenceService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ title: 'Get preference by id' })
  @ApiImplicitParam({ name: 'id' })
  fetchById(@Param('id') id: string): Promise<Preference> {
    return this.preferenceService.findById(id);
  }

  @Post()
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Create a new preference' })
  async create(@Body() createPreferenceDto: CreatePreferenceDto): Promise<Preference> {
    return this.preferenceService.create(createPreferenceDto);
  }

  @Put('/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Update preference by id' })
  @ApiImplicitParam({ name: 'id' })
  async update(
    @Param('id') id: string,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
  ): Promise<Preference> {
    return this.preferenceService.update(updatePreferenceDto, id)
  }

  @Delete('/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @HttpCode(204)
  @ApiOperation({ title: 'Delete preference by id' })
  @ApiImplicitParam({ name: 'id' })
  @ApiResponse({ status: 204, description: 'Successfuly deleted preference' })
  remove(
    @Param('id') id: string
  ) : Promise<Preference> {
    return this.preferenceService.remove(id);
  }
}
