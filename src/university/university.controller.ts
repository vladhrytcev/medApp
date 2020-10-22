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
  ApiImplicitParam,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { PersonRole } from '../common/enums/person-role.enum';
import { UniversityService } from './university.service';
import { ResponseUniversityInfoDto } from './dto/response-university.dto';
import { University } from './interfaces/university.interface';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { DeleteUniversityDto } from './dto/delete-university.dto';
import { AcceptableRoles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiUseTags('university')
@Controller('university')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class UniversityController {
  constructor(
    private readonly universityService: UniversityService
  ) {  }

  @Get()
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Get all universities' })
  @ApiResponse({ status: 200, type: ResponseUniversityInfoDto, isArray: true })
  fetchAll(@Req() req, @Query() query: any): Promise<University[]> {
    if (!req.user) {
      throw new HttpException('You not authorized', HttpStatus.BAD_REQUEST);
    }
    return this.universityService.findAll();
  }

  @Get('/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiResponse({ status: 200, type: ResponseUniversityInfoDto })
  @ApiImplicitParam({ name: 'id' })
  fetchById(@Param('id') id: number | string): Promise<University> {
    return this.universityService.findById(id);
  }

  @Post()
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Add a new university' })
  async create(@Body() createUniversityDto: CreateUniversityDto): Promise<University> {
    return this.universityService.create(createUniversityDto);
  }

  @Put('/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Update university description' })
  @ApiImplicitParam({ name: 'id' })
  async update(
    @Param('id') id: number | string,
    @Body() updateUniversityDto: UpdateUniversityDto
  ): Promise<University> {
    return this.universityService.update(updateUniversityDto, id);
  }

  @Delete()
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @HttpCode(204)
  @ApiOperation({ title: 'Delete university description' })
  @ApiResponse({ status: 204, description: 'Successfuly deleted university description' })
  remove(@Body() id: DeleteUniversityDto): Promise<University> {
    return this.universityService.remove(id);
  }
};
