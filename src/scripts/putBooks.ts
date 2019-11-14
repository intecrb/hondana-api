import { createDynamoDBDataMapper } from '../mapper';
import Book from '../books/model/book';
import { DynamoDB } from 'aws-sdk';

const createBooksData = async () => {
  // const dynamodb = new DynamoDB({
  //   endpoint: 'http://localhost:4569',
  //   region: 'us-east-1',
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

  const book001 = Object.assign(new Book(), {
    title: 'マイクロサービスアーキテクチャ',
    imgUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51IhSDZIJqL._SX352_BO1,204,203,200_.jpg',
  });
  await mapper.put(book001);
  const book002 = Object.assign(new Book(), {
    title: 'Web API: The Good Parts',
    author: '水野 貴明',
    imgUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51GHwTNJgSL._SX389_BO1,204,203,200_.jpg',
    isbn10: '4873116864',
    isbn13: '978-4873116860',
  });
  await mapper.put(book002);
  const book003 = Object.assign(new Book(), {
    title: 'プレゼンテーションzen',
    author: 'Garr Reynolds',
    imgUrl:
      'https://images-na.ssl-images-amazon.com/images/I/413z-nHOErL._SX298_BO1,204,203,200_.jpg',
    isbn10: '4873116864',
    isbn13: '978-4873116860',
  });
  await mapper.put(book003);
  const book004 = Object.assign(new Book(), {
    title: '[改訂第4版]SQLポケットリファレンス',
    author: '朝井 淳',
    imgUrl:
      'https://images-na.ssl-images-amazon.com/images/I/518GTfGD0aL._SX339_BO1,204,203,200_.jpg',
    isbn10: '4873116864',
    isbn13: '978-4873116860',
  });
  await mapper.put(book004);
  const book005 = Object.assign(new Book(), {
    title: '聖徳太子の実像に迫る',
    author: '林 春彦',
    imgUrl:
      'https://images-fe.ssl-images-amazon.com/images/I/51yvp0QWGbL.SR160,240_BG243,243,243.jpg',
    isbn10: '4873116864',
    isbn13: '978-4873116860',
  });
  await mapper.put(book005);

  // await Promise.all(
  //   [...Array(100)].map(() => {
  //     const book = Object.assign(new Book(), {
  //       title: Math.random()
  //         .toString(36)
  //         .slice(-8),
  //       imgUrl:
  //         'https://images-na.ssl-images-amazon.com/images/I/51IhSDZIJqL._SX352_BO1,204,203,200_.jpg',
  //     });
  //     mapper.put(book);
  //   }),
  // );
};

createBooksData();
