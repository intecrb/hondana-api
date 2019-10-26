import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiModelProperty({
    description: 'The title of book',
    required: true,
    maxLength: 200,
    example: 'Web API: The Good Parts',
  })
  readonly title: string;
}
