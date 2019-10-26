import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsOptional } from 'class-validator';

export class GetBooksDto {
  @ApiModelProperty({
    description: 'next id for pagination',
    required: false,
    maxLength: 36,
    minLength: 36,
    example: 'ad44c028-bcb0-44ca-b60b-d3879f0ad227',
  })
  @Length(36, 36)
  @IsOptional()
  readonly next?: string;
}
