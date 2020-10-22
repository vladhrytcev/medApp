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
import { DepartmentService } from './department.service';
import { ResponseDepartmentInfoDto } from './dto/respone-department.dto';
import { Department } from './interfaces/department.interface';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { AcceptableRoles } from '../common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiUseTags('department')
@Controller('department')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService
  ) {  }

  @Get()
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Get all departments' })
  @ApiResponse({ status: 200, type: ResponseDepartmentInfoDto, isArray: true })
  fetchAll(@Req() req, @Query() query: any): Promise<Department[]> {
    if (!req.user) {
      throw new HttpException('You not authorized', HttpStatus.BAD_REQUEST);
    }
    return this.departmentService.findAll();
  }

  @Get('/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Get department by id' })
  @ApiResponse({ status: 200, type: ResponseDepartmentInfoDto })
  @ApiImplicitParam({ name: 'id' })
  fetchById(@Param('id') id: number | string): Promise<Department> {
    return this.departmentService.findById(id);
  }

  @Post()
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Create a new department' })
  async create(@Body() createDepartmentDto: CreateDepartmentDto, @Req() req): Promise<Department> {
    return this.departmentService.create(createDepartmentDto, req);
  }

  @Put('/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @ApiOperation({ title: 'Update department by id' })
  @ApiImplicitParam({ name: 'id' })
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ): Promise<Department> {
    return this.departmentService.update(updateDepartmentDto, id);
  }

  @Delete('/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN)
  @HttpCode(204)
  @ApiOperation({ title: 'Delete department by id' })
  @ApiResponse({ status: 204, description: 'Successfuly deleted department' })
  remove(@Param('id') id: string): Promise<Department> {
    return this.departmentService.remove(id);
  }
};
