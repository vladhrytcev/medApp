import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UseGuards
} from '@nestjs/common';
import { Education } from './education.entity';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { DeleteResult } from 'typeorm';
import {
  ApiOperation,
  ApiUseTags,
  ApiResponse,
  ApiImplicitParam,
  ApiBearerAuth
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PersonRole } from '../common/enums/person-role.enum';
import { AcceptableRoles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('education')
@ApiUseTags('education')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class EducationController {
  constructor(
    private readonly educationService: EducationService,
  ) {  }

  @Get()
  @ApiOperation({ title: 'Get all educations' })
  async fetchAll(): Promise<CreateEducationDto[]> {
    return this.educationService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ title: 'Get education by id' })
  fetchById(@Param('id') id: string | number): Promise<Education> {
    return this.educationService.findById(id);
  }

  @Post()
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Create a new education' })
  async create(@Body() createEducationDto: CreateEducationDto): Promise<Education> {
    return this.educationService.create({
      ...createEducationDto
    } as Education);
  }

  @Put('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Update education by id' })
  @ApiImplicitParam({ name: 'id' })
  update(
    @Param('id') id: string | number,
    @Body() updateEducationDto: UpdateEducationDto,
  ): Promise<Education> {
    return this.educationService.updateById(id, updateEducationDto);
  }

  @Delete('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @HttpCode(204)
  @ApiOperation({ title: 'Delete education by id' })
  @ApiImplicitParam({ name: 'id' })
  @ApiResponse({ status: 204, description: 'Successfully deleted education' })
  remove(
    @Param('id') id: string | number,
  ): Promise<DeleteResult> {
    return this.educationService.removeById(id);
  }
}
