import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import { GridFSBucketReadStream } from 'mongodb';
import { Document } from './interfaces/document.interface';
import { Person } from '../person/interfaces/person.interface';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FileInfoVm } from './dto/file-info-vm.dto';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class DocumentService {
  private fileModel: MongoGridFS;
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectModel('documents')
    private readonly documentRepository: Model<Document>,
    @InjectModel('person')
    private readonly personRepository: Model<Person>,
  ) { 
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
   }

  async findAll(): Promise<Document[]> {
    return this.documentRepository.find();
  }

  async findByCurrentUserId(id: string): Promise<Document[]> {
    return this.personRepository.findById(id).populate('documents', this.documentRepository);
  }

  async findById(id: string): Promise<Document> {
    return this.documentRepository.findById(id);
  }
  
  async create(createDto: CreateDocumentDto, file: UploadFileDto): Promise<Document> {
    const createdDoc = new this.documentRepository({
      ...createDto,
      filename: file.filename
    })
    return await createdDoc.save();
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    const result = await this.fileModel
      .findById(id).catch(err => {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      })
      .then(result => result);
    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType
    };
  }

  async update(documentUpdateDto: UpdateDocumentDto, id: string): Promise<Document> {
    return await this.documentRepository.findByIdAndUpdate(id, documentUpdateDto);
  }

  async remove(id: string): Promise<Document> {
    return this.documentRepository.findByIdAndDelete(id);
  }

  async deleteFile(id: string): Promise<boolean> {
    return await this.fileModel.delete(id);
  }
};
