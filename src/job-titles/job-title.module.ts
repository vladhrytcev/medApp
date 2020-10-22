import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { JobTitleSchema } from "./schemas/job-title.schema";
import { JobTitleService } from "./job-title.service";
import { JobTitleController } from "./job-title.controller";
import { EmailService } from "../common/services/email.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'job-titles', schema: JobTitleSchema }
    ])
  ],
  providers: [JobTitleService, EmailService],
  exports: [JobTitleService],
  controllers: [JobTitleController]
})
export class JobTitleModule {  };
