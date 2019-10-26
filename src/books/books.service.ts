import { Injectable, Inject, Logger } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import Book from './domain/book';
import { createDynamoDBDataMapper } from '../mapper';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { CreateBookDto } from './requestDto/createBook.dto';
import { GetBooksResponse } from './responseDto/getBooksResponse';
import { ErrorResponse } from '../response/errorResponse';

@Injectable()
export class BooksService {
  private mapper: DataMapper;
  constructor(@Inject('DYNAMODB_CLIENT') private readonly dynamodb: DynamoDB) {
    this.mapper = createDynamoDBDataMapper(this.dynamodb);
  }

  public async findAll(next?: string): Promise<GetBooksResponse> {
    const items = await this.getPagingBooks(next);
    return {
      books: items ? items : [],
      next: items ? items[items.length - 1].id : null,
    };
  }

  private getPagingBooks = async (next?: string) => {
    const paginator = this.mapper
      .scan(Book, {
        limit: 10,
        startKey: next ? { id: next } : null,
      })
      .pages();

    for await (const pageItems of paginator) {
      return pageItems;
    }
  };

  public async findOne(id: string): Promise<Book | ErrorResponse> {
    let book: Book;
    // TODO: throwして404をcatchするException Filterを実装したい https://docs.nestjs.com/exception-filters
    try {
      book = await this.mapper.get(
        Object.assign(new Book(), {
          id,
        }),
      );
    } catch (error) {
      Logger.log(error);
      book = null;
    }

    return book
      ? book
      : Object.assign(new ErrorResponse(), {
          statusCode: 404,
          error: 'Not Found',
          message: `It was not found with the specified request id: ${id}`,
        });
  }

  async createBook(createBookDto: CreateBookDto) {
    const book = new Book();
    book.title = createBookDto.title;
    return await this.mapper.put(book);
  }
}
