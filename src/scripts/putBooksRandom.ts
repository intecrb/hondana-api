import { createDynamoDBDataMapper } from '../mapper';
import Book from '../books/domain/book';
import { DynamoDB } from 'aws-sdk';

const createBooksData = async () => {
  const dynamodb = new DynamoDB({
    endpoint: 'http://localhost:4569',
    region: 'us-east-1',
  });
  const mapper = createDynamoDBDataMapper(dynamodb);

  await Promise.all(
    [...Array(100)].map(() => {
      const book = Object.assign(new Book(), {
        title: Math.random()
          .toString(36)
          .slice(-8),
      });
      mapper.put(book);
    }),
  );
};

createBooksData();
