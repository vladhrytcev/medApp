import { ApiUseTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import {
  Controller,
  UseGuards,
  Get,
  Req,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Param
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../common/guards/roles.guard";
import { AcceptableRoles } from "../common/decorators/roles.decorator";
import { PersonRole } from "../common/enums/person-role.enum";
import { DeviceInterface } from "./interfaces/device.interface";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { DeviceService } from './device.service';
import { MessageService } from '../message/message.service';
import { CreateMessageDto } from '../message/dto/create-message.dto';

@ApiUseTags('notification')
@Controller('device')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly messageService: MessageService
  ) {  }

  @Get()
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Get all devices' })
  async getDevices(@Req() req): Promise<DeviceInterface[]> {
    if (!req.user) {
      throw new HttpException('You not authorized', HttpStatus.BAD_REQUEST);
    }
    return this.deviceService.findAll();
  }

  @Post('/:projectId/:customerId')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Create device' })
  async create(
    @Body() createDto: CreateDeviceDto,
    @Param('projectId') projectId: string,
    @Param('customerId') customerId: string,
  ): Promise<DeviceInterface> {
    const fcmToken = createDto.fmcToken;
    if (fcmToken) {
      const device = {
        projectId,
        customerId,
        token: fcmToken
      } as DeviceInterface;
      return await this.deviceService.create(device);
    } else {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/:customerId/messages')
  @AcceptableRoles(PersonRole.ADMIN)
  @ApiOperation({ title: 'Send message' })
  async sendNotification(
    @Body() message: CreateMessageDto,
    @Param('customerId') customerId: string
  ): Promise<CreateMessageDto> {
    const device = await this.deviceService.findById(customerId);
    if (device) {
      const fmcToken = device.token;
      const extendedMessage = { ...message, subscriber: customerId }
      const data = await this.messageService.sendMessage(extendedMessage);
      return data;
    } else {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}