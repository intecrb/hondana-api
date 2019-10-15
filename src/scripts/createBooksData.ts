import { createDynamoDBDataMapper } from '../mapper';
import Book from '../books/book';
import { DynamoDB } from 'aws-sdk';

const createBooksData = async () => {
  const dynamodb = new DynamoDB({
    endpoint: 'http://localhost:4569',
    region: 'us-east-1',
  });
  const mapper = createDynamoDBDataMapper(dynamodb);

  await mapper.createTable(Book, {
    readCapacityUnits: 5,
    writeCapacityUnits: 5,
  });

  const book001 = Object.assign(new Book(), {
    title: 'マイクロサービスアーキテクチャ',
  });
  await mapper.put(book001);
  const book002 = Object.assign(new Book(), {
    title: 'Web API: The Good Parts',
    author: '水野 貴明',
    isbn10: '4873116864',
    isbn13: '978-4873116860',
  });
  await mapper.put(book002);

  [...Array(10)].map(() => {
    const b = Object.assign(new Book(), {
      title: Math.random()
        .toString(36)
        .slice(-8),
    });
    mapper.put(b);
  });
};

createBooksData();
