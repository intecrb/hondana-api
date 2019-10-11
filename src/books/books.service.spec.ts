import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { DynamoDB } from 'aws-sdk';
import Book from './book';
import { createDynamoDBDataMapper } from '../mapper';

describe('BooksService', () => {
  let service: BooksService;
  const dynamodb = new DynamoDB({
    endpoint: 'http://localhost:4569',
    region: 'us-east-1',
  });
  const mapper = createDynamoDBDataMapper(dynamodb);

  beforeAll(async () => {
    jest.setTimeout(100000);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: 'DYNAMODB_CLIENT',
          useValue: dynamodb,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);

    await setUp();
  });

  afterEach(async () => {
    await cleanUp();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return a book', async () => {
    const book = Object.assign(new Book(), {
      id: 222222222,
      title: 'Web API: The Good Parts',
    });
    await mapper.put(book);

    const books = await service.findAll();
    expect(books[0].id).toBe(222222222);
    expect(books[0].title).toBe('Web API: The Good Parts');
  });

  it('should be return two books', async () => {
    const book001 = Object.assign(new Book(), {
      id: 111111111,
      title: 'マイクロサービスアーキテクチャ',
    });
    await mapper.put(book001);
    const book002 = Object.assign(new Book(), {
      id: 222222222,
      title: 'Web API: The Good Parts',
    });
    await mapper.put(book002);

    const books = await service.findAll();
    expect(books).toHaveLength(2);
    expect(books[0].id).toBe(111111111);
    expect(books[0].title).toBe('マイクロサービスアーキテクチャ');
    expect(books[1].id).toBe(222222222);
    expect(books[1].title).toBe('Web API: The Good Parts');
  });

  const cleanUp = async () => {
    await mapper.deleteTable(Book);
  };

  const setUp = async () => {
    await mapper.createTable(Book, {
      readCapacityUnits: 5,
      writeCapacityUnits: 5,
    });
  };
});
