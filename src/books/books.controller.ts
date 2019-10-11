import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';
import Book from './book';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }
}
