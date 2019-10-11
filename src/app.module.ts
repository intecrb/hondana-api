import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { DynamoDB } from 'aws-sdk';

@Module({
  imports: [],
  controllers: [AppController, BooksController],
  providers: [
    AppService,
    BooksService,
    {
      provide: 'DYNAMODB_CLIENT',
      useValue: new DynamoDB({
        region: 'us-east-1',
        endpoint: 'http://localhost:4569',
      }),
    },
    {
      provide: 'BOOKS_TABLE',
      useValue: process.env.NODE_ENV + '_' + 'books',
    },
  ],
})
export class AppModule {}
