import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OneSignalModule } from 'onesignal-api-client-nest';
import { MessageSchema } from './schemas/message.schema';
import { MessageService } from './message.service';

import * as fs from 'fs';
import * as dotenv from 'dotenv';

const {
  APP_ID,
  REST_API_KEY
} = dotenv.parse(fs.readFileSync(process.env.PWD + '/.env'));

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'messages', schema: MessageSchema }
    ]),
    OneSignalModule.forRoot({
      appId: APP_ID,
      restApiKey: REST_API_KEY
    })
  ],
  providers: [MessageService],
  exports: [MessageService]
})

export class MessageModule {  };
