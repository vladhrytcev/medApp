import { ApiUseTags, ApiOperation, ApiImplicitParam, ApiResponse } from "@nestjs/swagger";
import { Controller, Get, Req, Post, Body, HttpCode, Param, Delete } from "@nestjs/common";
import { SpecialityService } from "./specialityList.service";
import { Speciality } from "./interfaces/speciality.interface";
import { SpecialityDto } from "./dto/specialityList.dto";

@ApiUseTags('speciality')
@Controller('speciality')
export class SpecialityController {
  constructor(
    private readonly specialityService: SpecialityService,
  ) {  }

  @Get()
  @ApiOperation({ title: 'Get all specialities' })
  fetchAll(@Req() req): Promise<Speciality> {
    return this.specialityService.findAll();
  }

  @Post()
  @ApiOperation({ title: 'Create specialities' })
  async create(@Body() createSpecialityDto: SpecialityDto): Promise<Speciality> {
    return this.specialityService.create(createSpecialityDto)
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ title: 'Delete specialities' })
  @ApiImplicitParam({ name: 'id' })
  @ApiResponse({ status: 204, description: 'Successfuly deleted speciality' })
  remove(
    @Param('id') id: string
  ): Promise<Speciality> {
    return this.specialityService.remove(id);
  }
}
