import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';
import Book from './book';
import { ApiResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOkResponse({ description: 'OK' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }
}
