import { createDynamoDBDataMapper } from '../mapper';
import Book from '../books/model/book';
import { DynamoDB } from 'aws-sdk';

const initTable = async () => {
  try {
    const dynamodb = new DynamoDB({
      endpoint: 'http://localhost:4569',
      region: 'us-east-1',
    });
    const mapper = createDynamoDBDataMapper(dynamodb);

    await mapper.ensureTableNotExists(Book);

    await mapper.createTable(Book, {
      readCapacityUnits: 5,
      writeCapacityUnits: 5,
    });
  } catch (error) {
    console.log(error);
  }
};

initTable();
