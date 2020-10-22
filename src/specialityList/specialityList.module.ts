import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SpecialitySchema } from "./schemas/speciality.schema";
import { SpecialityService } from "./specialityList.service";
import { SpecialityController } from "./specialityList.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'specialities', schema: SpecialitySchema },
    ])
  ],
  providers: [
    SpecialityService
  ],
  exports: [SpecialityService],
  controllers: [SpecialityController]
})

export class SpecialityModule {  }