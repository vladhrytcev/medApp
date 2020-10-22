import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversitySchema } from './schemas/university.schema';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'University',
      schema: UniversitySchema
    }])
  ],
  controllers: [UniversityController],
  providers: [UniversityService],
  exports: [UniversityService]
})

export class UniversityModule {  }
