import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import * as GridFsStorage from 'multer-gridfs-storage';
import { ORM_CONFIG } from '../../config';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: GridFsStorage;

  constructor() {
    this.gridFsStorage = new GridFsStorage({
      url: `${ORM_CONFIG.type}://${ORM_CONFIG.host}:${ORM_CONFIG.port}/${ORM_CONFIG.database}`
    })
  }
  
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage
    }
  }
}