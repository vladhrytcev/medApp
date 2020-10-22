import { IsString, ValidateNested, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { FileInfoVm } from './file-info-vm.dto';

export class FileResponseVm {
  @IsString()
  @ApiModelProperty()
  readonly message: string;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: FileInfoVm })
  readonly file?: FileInfoVm;
}
