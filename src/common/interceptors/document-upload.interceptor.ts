import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as mongoose from 'mongoose';
import * as grid from 'gridfs-stream';
import { Document } from '../../document/interfaces/document.interface';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  constructor(
    @InjectModel('documents')
    private readonly documentRepository: Model<Document>
  ) {  }

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    return next.handle().pipe(
      map(data => {
        grid.mongo = mongoose.mongo;
        const gfs = grid(this.documentRepository, mongoose.mongo);
        const writestream = gfs.createWriteStream({ filename: '' });
        data.createReadStream().pipe(writestream);
        writestream.on('close', e => {
          console.log('done!')
        })
      })
    )
  }
}