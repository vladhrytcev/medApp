import {
  Body,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Req,
  Controller,
  Post,
  UseGuards,
  HttpCode,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiUseTags,
  ApiImplicitParam,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { PersonRole } from '../common/enums/person-role.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AcceptableRoles } from '../common/decorators/roles.decorator';
import { User } from './interfaces/user.interface';

@ApiUseTags('user')
@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {  }

  @Get()
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get all users' })
  fetchAll(@Req() req): Promise<User[]> {
    if (!req.user) {
      throw new HttpException('You not authorized', HttpStatus.BAD_REQUEST);
    }
    return this.userService.findAll();
  }

  @Get('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get user by id' })
  @ApiImplicitParam({ name: 'id' })
  fetchById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Create a new user' })
  async create(@Body() createDto: CreateUserDto, @Req() req): Promise<User> {
    return this.userService.create(createDto, req);
  }

  @Put('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Update user by id' })
  @ApiImplicitParam({ name: 'id' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.update(updateDto, id);
  }

  @Delete('/:id')
  @AcceptableRoles(PersonRole.ADMIN)
  @HttpCode(204)
  @ApiOperation({ title: 'Delete user by id' })
  remove(@Param() id: string): Promise<User> {
    return this.userService.remove(id);
  }
}
