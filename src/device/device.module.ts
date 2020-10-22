import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from './schemas/device.schema';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { MessageService } from '../message/message.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'devices', schema: DeviceSchema }
  ])],
  controllers: [DeviceController],
  providers: [
    DeviceService,
    MessageService
  ],
  exports: [DeviceService]
})

export class DeviceModule {  };
