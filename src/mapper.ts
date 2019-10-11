import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';

export function createDynamoDBDataMapper(dynamodb?: DynamoDB) {
  return new DataMapper({
    client: dynamodb ? dynamodb : new DynamoDB(),
    tableNamePrefix: process.env.NODE_ENV + '_',
  });
}
