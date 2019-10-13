import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import Book from './book';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateBookDto } from './createBook.dto';
import { ErrorResponseModel } from '../response/errorResponse';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOkResponse({ description: 'ok' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'ok' })
  @ApiNotFoundResponse({ description: 'not found', type: ErrorResponseModel })
  async findOne(@Param('id') id: string): Promise<Book | ErrorResponseModel> {
    const book = await this.booksService.findOne(id);
    return book
      ? book
      : Object.assign(new ErrorResponseModel(), {
          code: 404,
          message: 'not found',
        });
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Book,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }
}
