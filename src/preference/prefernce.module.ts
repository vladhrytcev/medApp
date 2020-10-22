import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferenceSchema } from './schemas/preference.schema';
import { PreferenceService } from './preference.service';
import { PersonSchema } from '../person/schemas/person.schema';
import { PreferenceController } from './preference.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'preferences', schema: PreferenceSchema },
      { name: 'person', schema: PersonSchema }
    ])
  ],
  providers: [
    PreferenceService
  ],
  exports: [PreferenceService],
  controllers: [PreferenceController]
})

export class PreferenceModule {  }