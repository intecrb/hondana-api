import { createDynamoDBDataMapper } from '../mapper';
import Book from '../books/model/book';
import { DynamoDB } from 'aws-sdk';

const scanTable = async () => {
  const proxy = require('proxy-agent');
  const dynamodb = new DynamoDB({
    region: 'ap-northeast-1',
  });
  // プロキシの設定
  dynamodb.config.update({
    httpOptions: { agent: proxy('http://proxy2.ibis.intec.co.jp:8080') },
  });

  const mapper = createDynamoDBDataMapper(dynamodb);
  // for await (const item of mapper.scan(Book)) {
  //   // tslint:disable-next-line: no-console
  //   console.log(item);
  // }

  const book = await mapper.get(
    Object.assign(new Book(), {
      id: '6505aef7-db98-47c0-8ed6-ece62ab41275',
    }),
  );
  // tslint:disable-next-line: no-console
  console.log(book);
};

scanTable();
