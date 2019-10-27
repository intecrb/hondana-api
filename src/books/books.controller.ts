import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import Book from './model/book';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateBookDto } from './requestDto/createBook.dto';
import { ErrorResponse } from '../response/errorResponse';
import { GetBooksResponse } from './responseDto/getBooksResponse';
import { GetBooksDto } from './requestDto/getBooks.dto';

@Controller('books')
@ApiForbiddenResponse({ description: 'FORBIDDEN', type: ErrorResponse })
@ApiBadRequestResponse({
  description: 'BAD REQUEST',
  type: ErrorResponse,
})
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOkResponse({ description: 'OK', type: GetBooksResponse })
  @ApiNotFoundResponse({ description: 'NOT FOUND', type: ErrorResponse })
  findAll(
    @Query() getBooksDto?: GetBooksDto,
  ): Promise<GetBooksResponse | ErrorResponse> {
    return this.booksService.findAll(getBooksDto.next, getBooksDto.limit);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'OK', type: Book })
  @ApiNotFoundResponse({ description: 'NOT FOUND', type: ErrorResponse })
  async findOne(@Param('id') id: string): Promise<Book | ErrorResponse> {
    return await this.booksService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Book,
  })
  @ApiForbiddenResponse({ description: 'FORBIDDEN' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }
}
