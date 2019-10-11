import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { DynamoDB } from 'aws-sdk';

describe('BooksService', () => {
  let service: BooksService;
  const dynamodb = new DynamoDB({
    endpoint: 'http://localhost:4569',
    region: 'us-east-1',
  });
  const testTable = 'testdb';

  beforeAll(async () => {
    await dynamodb
      .createTable({
        TableName: testTable,
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'N',
          },
        ],
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      })
      .promise();

    await dynamodb
      .putItem({
        TableName: testTable,
        Item: {
          id: { N: '222222222' },
        },
      })
      .promise();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: 'DYNAMODB_CLIENT',
          useValue: dynamodb,
        },
        {
          provide: 'BOOKS_TABLE',
          useValue: 'testdb',
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  afterAll(() => {
    // cleanUp();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return a book', async () => {
    const books = await service.findBooks();
    expect(books).toStrictEqual([{ id: { N: '222222222' } }]);
  });

  const cleanUp = async () => {
    await dynamodb
      .deleteTable({
        TableName: testTable,
      })
      .promise();
  };
});
