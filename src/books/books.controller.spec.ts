import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { DynamoDB } from 'aws-sdk';

describe('Books Controller', () => {
  let controller: BooksController;
  const dynamodb = new DynamoDB({
    region: 'us-east-1',
    endpoint: 'http://localhost:4569',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: 'DYNAMODB_CLIENT',
          useValue: dynamodb,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
