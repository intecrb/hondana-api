import { Injectable, Inject } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class BooksService {
  constructor(
    @Inject('DYNAMODB_CLIENT') private readonly dynamodb: DynamoDB,
    @Inject('BOOKS_TABLE') private readonly table: DynamoDB.TableName,
  ) {}

  async findBooks() {
    const res = await this.dynamodb.scan({ TableName: this.table }).promise();
    return res.Items;
  }
}
