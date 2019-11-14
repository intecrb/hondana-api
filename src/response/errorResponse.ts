import { ApiModelProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiModelProperty({
    type: 'string',
    description: 'Error code',
    example: '400',
  })
  statusCode: string;

  @ApiModelProperty({
    type: 'string',
    description: 'Error message',
    example: 'Bad Request',
  })
  error: string;

  // TODO: message modelを作成する
  @ApiModelProperty({
    type: 'string',
    description: 'error message',
    example: `{
      target: {
        next: 'ad44c028-bcb0-44ca-b60b-d3879f0ad22',
      },
      value: 'ad44c028-bcb0-44ca-b60b-d3879f0ad22',
      property: 'next',
      children: [],
      constraints: {
        length: 'next must be longer than or equal to 36 characters',
      },
    }`,
  })
  message: any;
}
