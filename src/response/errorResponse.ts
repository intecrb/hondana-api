import { ApiModelProperty } from '@nestjs/swagger';

export class ErrorResponseModel {
  @ApiModelProperty({
    type: 'number',
    description: 'error code',
    example: '404',
  })
  code: number;

  @ApiModelProperty({
    type: 'string',
    description: 'error message',
    example: 'not found',
  })
  message: string;
}
