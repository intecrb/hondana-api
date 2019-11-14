import { ApiModelProperty } from '@nestjs/swagger';
import { Length, IsOptional, Min, Max, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

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

  @ApiModelProperty({
    description: 'maximum paging count',
    required: false,
    maximum: 100,
    minimum: 1,
    example: '10',
  })
  // クエリストリングで整数型の値を class-validator でバリデーションしたい場合は
  // class-transformer の @Type() を使用して一度 Number 型に変換した後で
  // @IsNumber() などを使用する。Ref: https://github.com/nestjs/nest/issues/1331
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Max(100)
  @Min(1)
  readonly limit?: number;
}
