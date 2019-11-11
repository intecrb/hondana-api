import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { DynamoDB } from 'aws-sdk';

export const getDynamoDBClient = () => {
  const proxy = require('proxy-agent');
  const dynamodb = new DynamoDB({
    region: 'ap-northeast-1',
  });
  // プロキシの設定
  dynamodb.config.update({
    httpOptions: { agent: proxy('http://proxy2.ibis.intec.co.jp:8080') },
  });
  Logger.log(dynamodb);
  return dynamodb;
};

@Module({
  imports: [],
  controllers: [AppController, BooksController],
  providers: [
    AppService,
    BooksService,
    {
      provide: 'DYNAMODB_CLIENT',
      useValue: getDynamoDBClient(),
    },
    {
      provide: 'BOOKS_TABLE',
      useValue: process.env.NODE_ENV + '_' + 'books',
    },
  ],
})
export class AppModule {}
