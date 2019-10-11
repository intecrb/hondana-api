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
    id: 111111111,
    title: 'マイクロサービスアーキテクチャ',
  });
  await mapper.put(book001);
  const book002 = Object.assign(new Book(), {
    id: 222222222,
    title: 'Web API: The Good Parts',
  });
  await mapper.put(book002);
};

createBooksData();
