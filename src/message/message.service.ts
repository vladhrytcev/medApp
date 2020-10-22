import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageInterface } from './interfaces/message.inerface';
import { CreateMessageDto } from './dto/create-message.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { UpdateMessageDto } from './dto/update-message.dto';
import { OneSignalService } from 'onesignal-api-client-nest'
import { NotificationBySegmentBuilder } from 'onesignal-api-client-core';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('messages')
    private readonly messageRepository: Model<MessageInterface>,
    private oneSignalService: OneSignalService,
  ) {  }

  async sendMessage(message: CreateMessageDto): Promise<any> {
    const input = new NotificationBySegmentBuilder()
      .setExcludedSegments(['Active Users', 'Inactive users'])  
      .notification()
      .setContents({ en: message })
      .build();

      await this.oneSignalService.createNotification(input);
  }

  async create(createDto: Observable<AxiosResponse<any>>): Promise<MessageInterface> {
    const createdMessage = new this.messageRepository({
      ...createDto
    });
    return await createdMessage.save();
  }

  async update(updateDto: UpdateMessageDto, id: string): Promise<MessageInterface> {
    return await this.messageRepository.findByIdAndUpdate(id, updateDto);
  }
}