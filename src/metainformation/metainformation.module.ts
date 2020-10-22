import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetainformationSchema } from './schemas/metainformation.schema';
import { MetainformationController } from './metainformation.controller';
import { MetainformationService } from './metainformation.service';
import { FieldSchema } from './schemas/field.schema';
import { QualificationSchema } from './schemas/qualification.schema';
import { EmailService } from '../common/services/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'metainformations',
        schema: MetainformationSchema
      },
      {
        name: 'fields',
        schema: FieldSchema
      },
      {
        name: 'qualifications',
        schema: QualificationSchema
      },
    ])
  ],
  controllers: [MetainformationController],
  providers: [MetainformationService, EmailService],
  exports: [MetainformationService]
})

export class MetainformationModule {  }
