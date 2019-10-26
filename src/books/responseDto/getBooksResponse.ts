import { ApiModelProperty } from '@nestjs/swagger';
import Book from '../domain/book';

export class GetBooksResponse {
  @ApiModelProperty({ type: Book, isArray: true })
  readonly books: Book[];

  @ApiModelProperty()
  readonly next: string;
}
