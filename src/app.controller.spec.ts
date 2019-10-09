import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoDB } from 'aws-sdk';

describe('AppController', () => {
  let appController: AppController;

  const db = new DynamoDB({
    endpoint: 'http://localhost:4569',
    region: 'us-east-1',
  });
  const testTable = 'testdb';

  beforeAll(async () => {
    await db
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

    await db
      .putItem({
        TableName: testTable,
        Item: {
          id: { N: '222222222' },
        },
      })
      .promise();
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterAll(async () => {
    await db
      .deleteTable({
        TableName: testTable,
      })
      .promise();
  });

  describe('GET /', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('GET /books', () => {
    it('should return one record', async () => {
      const a = await appController.findAll();
      // tslint:disable-next-line: no-console
      console.log(a);
      expect(a).toHaveLength(1);
      expect(a).toEqual([{ id: { N: '222222222' } }]);
    });
  });
});
