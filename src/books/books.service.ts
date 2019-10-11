import { Injectable, Inject } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import Book from './book';
import { createDynamoDBDataMapper } from '../mapper';
import { DataMapper } from '@aws/dynamodb-data-mapper';

@Injectable()
export class BooksService {
  private mapper: DataMapper;
  constructor(@Inject('DYNAMODB_CLIENT') private readonly dynamodb: DynamoDB) {
    this.mapper = createDynamoDBDataMapper(this.dynamodb);
  }

  async findAll(): Promise<Book[]> {
    const items: Book[] = [];
    for await (const item of this.mapper.scan(Book)) {
      items.push(item);
    }
    return items;
  }
}
