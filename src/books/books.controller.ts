import { Controller, Get, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import Book from './book';
import { ApiResponse } from '@nestjs/swagger';
import { CreateBookDto } from './createBook.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'OK' })
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }
}
