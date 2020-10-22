import {
  Body,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  Controller,
  Post,
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
  ApiConsumes,
  ApiImplicitFile,
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { RolesGuard } from '../common/guards/roles.guard';

import { PersonRole } from '../common/enums/person-role.enum';
import { DocumentService } from './document.service';
import { ResponseDocumentInfoDto } from './dto/response-document.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FilterDocumentDto } from './dto/filter-document-type.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { AcceptableRoles } from '../common/decorators/roles.decorator';
import { Document } from './interfaces/document.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileResponseVm } from './dto/file-response-vm.dto';

@ApiUseTags('document')
@Controller('document')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
  ) {  }

  @Get()
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN, PersonRole.USER)
  @ApiOperation({ title: 'Get all documents' })
  @ApiResponse({ status: 200, type: ResponseDocumentInfoDto, isArray: true })
  fetchAll(@Req() req, @Query() query: FilterDocumentDto): Promise<Document[]> {
    if (!req.user) {
      throw new HttpException('You not authorized', HttpStatus.BAD_REQUEST);
    }
    return this.documentService.findAll();
  }

  @Get('/:currentUserId')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN, PersonRole.USER)
  @ApiOperation({ title: 'Get all documents by current user id' })
  @ApiResponse({ status: 200, type: ResponseDocumentInfoDto, isArray: true })
  fetchByUserId(@Param('currentUserId') id: string): Promise<Document[]> {
    return this.documentService.findByCurrentUserId(id);
  }

  @Get('/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN, PersonRole.USER)
  @ApiOperation({ title: 'Get document by id' })
  @ApiResponse({ status: 200, type: ResponseDocumentInfoDto })
  fetchById(@Param('id') id: string): Promise<Document> {
    return this.documentService.findById(id);
  }

  @Get('info/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN, PersonRole.USER)
  @ApiOperation({ title: 'Get documet file info by id' })
  async getFileInfo(@Param('id') id: string): Promise<FileResponseVm> {
    const file = await this.documentService.findInfo(id);
    const fileStream = await this.documentService.readStream(id);
    if (!fileStream) {
      throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED);
    }
    return {
      message: 'File has been detected',
      file: file
    }
  }

  @Get('download/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN, PersonRole.USER)
  @ApiOperation({ title: 'Get file by id' })
  async downloadFile(@Param('id') id: string, @Res() res) {
    const file = await this.documentService.findInfo(id);
    const fileStream = await this.documentService.readStream(id);
    if (!fileStream) {
      throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED);
    }
    res.header('Content-Type', file.contentType);
    res.header('Content-Disposition', 'attachment; filename = ' + file.filename);
    return fileStream.pipe(res);
  }

  @Post('/upload')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN, PersonRole.USER)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ title: 'Upload document file' })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'Document file' })
  async uploadDocument(
    @Req() req,
    @UploadedFile() file: UploadFileDto,
    @Body() fileMetainformation: CreateDocumentDto
  ): Promise<any> {
    this.documentService.create(fileMetainformation, file);
    return file;
  }

  @Put('/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN, PersonRole.USER)
  @ApiOperation({ title: 'Update document' })
  @ApiResponse({ status: 200, type: UpdateDocumentDto })
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto
  ): Promise<Document> {
    return this.documentService.update(updateDocumentDto, id);
  }

  @Get('delete/:id')
  @AcceptableRoles(PersonRole.ADMIN, PersonRole.ORG_ADMIN, PersonRole.USER)
  @HttpCode(204)
  @ApiOperation({ title: 'Delete file by id' })
  @ApiResponse({ status: 204, description: 'Successfully deleted file' })
  async deleteFile(@Param('id') id: string): Promise<FileResponseVm> {
    const file = await this.documentService.findInfo(id);
    const fileStream = await this.documentService.deleteFile(id);
    if (!fileStream) {
      throw new HttpException('An error occurred during file deletion', HttpStatus.EXPECTATION_FAILED);
    }
    this.documentService.remove(id);
    return {
      message: 'File has been deleted',
      file
    };
  }
};
