import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { DocumentSchema } from './schemas/document.schema';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { PersonSchema } from '../person/schemas/person.schema';
import { FileUploadInterceptor } from '../common/interceptors/document-upload.interceptor';
import { GridFsMulterConfigService } from '../common/services/gridfs-multer.service';
import { FileSchema } from './schemas/file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: 'documents',
        schema: DocumentSchema
      },
      {
        name: 'person',
        schema: PersonSchema
      },
      {
        name: 'fs.files',
        schema: FileSchema
      }
    ]),
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  controllers: [DocumentController],
  providers: [DocumentService, FileUploadInterceptor, GridFsMulterConfigService],
  exports: [DocumentService]
})

export class DocumentModule {  }