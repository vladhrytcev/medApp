import { IsString } from 'class-validator';
import { ApiModelProperty} from '@nestjs/swagger';
import { Person } from '../person.entity';

export class ResponseByCreatePersonDto extends Person {
  @IsString()
  @ApiModelProperty()
  readonly password: string;
}
