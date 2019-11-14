import { ApiModelProperty } from '@nestjs/swagger';
import Book from '../model/book';

export class GetBooksResponse {
  @ApiModelProperty({ type: Book, isArray: true })
  readonly books: Book[];

  @ApiModelProperty()
  readonly next: string;
}
