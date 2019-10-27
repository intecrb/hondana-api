import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { DynamoDB } from 'aws-sdk';
import Book from './model/book';
import { createDynamoDBDataMapper } from '../mapper';
import * as pMap from 'p-map';

describe('BooksService', () => {
  let service: BooksService;
  const dynamodb = new DynamoDB({
    endpoint: 'http://localhost:4569',
    region: 'us-east-1',
  });
  const mapper = createDynamoDBDataMapper(dynamodb);

  beforeAll(async () => {
    jest.setTimeout(100000);
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
    await setUpItems();
  });

  afterAll(async () => {
    await cleanUp();
  });

  describe('本の一覧を検索する', () => {
    it('複数件検索できること', async () => {
      const res = await service.findAll();
      expect(res.books.length).toBeGreaterThan(1);
    });

    it('ページング機能が使えること', async () => {
      const first = await service.findAll();
      expect(first.books).toHaveLength(10);

      const second = await service.findAll(first.next);
      expect(second.books).toHaveLength(5);

      const third = await service.findAll(second.next);
      expect(third.books).toHaveLength(0);
      expect(third.next).toBeNull();
    });

    it('件数指定機能が使えること', async () => {
      const firstPage = await service.findAll(null, 5);
      expect(firstPage.books).toHaveLength(5);
    });

    it('ページング機能と件数指定機能が同時に使えること', async () => {
      const first = await service.findAll(null, 5);
      expect(first.books).toHaveLength(5);

      const second = await service.findAll(first.next, 5);
      expect(second.books).toHaveLength(5);

      const third = await service.findAll(second.next);
      expect(third.books).toHaveLength(5);

      const fourth = await service.findAll(third.next);
      expect(fourth.books).toHaveLength(0);
      expect(fourth.next).toBeNull();
    });
  });

  describe('本を１件登録する', () => {
    it('id と createdAt が自動的に入力されて登録されること', async () => {
      const book = Object.assign(new Book(), {
        title: 'Web API: The Good Parts',
      });

      const createdBook = await service.createBook(book);

      const res = await mapper.get(createdBook);
      expect(res).toBeDefined();
      expect(res.id).toBe(createdBook.id);
      expect(res.title).toBe('Web API: The Good Parts');
      expect(res.author).toBeUndefined();
      expect(res.createdAt).toStrictEqual(createdBook.createdAt);
    });

    it('パーティションキーとソートキー意外は入力しなくても登録できること', async () => {
      const createdBook = await service.createBook(new Book());

      const res = await mapper.get(createdBook);
      expect(res).toBeDefined();
      expect(res.id).toBe(createdBook.id);
      expect(res.title).toBeUndefined();
      expect(res.author).toBeUndefined();
      expect(res.createdAt).toStrictEqual(createdBook.createdAt);
    });
  });

  // describe('本を１件登録する'', () => {
  //   it('登録できること', async () => {
  //     const book = Object.assign(new Book(), {
  //       title: 'Web API: The Good Parts',
  //     });

  //     await service.createBook(book);

  //     const res = await service.findAll();
  //     expect(res.books).toHaveLength(1);
  //     expect(res.books[0].id).toBeDefined();
  //     expect(res.books[0].title).toBe('Web API: The Good Parts');
  //     expect(res.books[0].createdAt).toBeDefined();
  //   });
  // });

  const cleanUp = async () => {
    await mapper.deleteTable(Book);
  };

  const setUp = async () => {
    await mapper.createTable(Book, {
      readCapacityUnits: 5,
      writeCapacityUnits: 5,
    });
  };

  const setUpItems = async () => {
    // Promise.allで実行するとlocalstackのDynamoDBがキャパシティオーバになってしまう。
    // 書き込みエラーが発生することがあるため、処理が遅くなることを許容して pMap を使用して同時実行数を制限する
    const site = async () => {
      const book = Object.assign(new Book(), {
        title: Math.random()
          .toString(36)
          .slice(-8),
      });
      await mapper.put(book);
    };
    await pMap([...Array(15)], site, { concurrency: 2 });
  };
});
