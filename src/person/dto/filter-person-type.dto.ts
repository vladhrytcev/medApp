import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { QueryOrder } from '../../common/enums/query-order.enum';
import { PersonRole } from '../../common/enums/person-role.enum';

export class FilterPersonDto {
  @IsString() @IsOptional() @ApiModelPropertyOptional() readonly firstName?: string;
  @IsString() @IsOptional() @ApiModelPropertyOptional() readonly lastName?: string;
  @IsString() @IsOptional() @ApiModelPropertyOptional() readonly orderBy?: string;
  @IsEnum(QueryOrder) @IsOptional() @ApiModelPropertyOptional() readonly orderType?: QueryOrder;
  @IsEnum(PersonRole) @IsOptional() @ApiModelPropertyOptional() readonly role?: PersonRole;
}
