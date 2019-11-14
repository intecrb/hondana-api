import { createDynamoDBDataMapper } from '../mapper';
import Book from '../books/model/book';
import { DynamoDB } from 'aws-sdk';

const initTable = async () => {
  try {
    // const dynamodb = new DynamoDB({
    //   // endpoint: 'http://localhost:4569',
    //   // region: '  us-east-1',
    //   region: 'ap-northeast-1',
    // });

    const proxy = require('proxy-agent');
    const dynamodb = new DynamoDB({
      region: 'ap-northeast-1',
    });
    // プロキシの設定
    dynamodb.config.update({
      httpOptions: { agent: proxy('http://proxy2.ibis.intec.co.jp:8080') },
    });
    const mapper = createDynamoDBDataMapper(dynamodb);

    await mapper.ensureTableNotExists(Book);
    // tslint:disable-next-line: no-console
    console.log('DELETED TABLE');

    await mapper.createTable(Book, {
      readCapacityUnits: 5,
      writeCapacityUnits: 5,
    });
    await mapper.ensureTableNotExists(Book);
    // tslint:disable-next-line: no-console
    console.log('CREATED TABLE');
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};

initTable();
