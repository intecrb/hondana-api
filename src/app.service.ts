import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async findBooks() {
    const db = new DynamoDB({
      endpoint: 'http://localhost:4569',
      region: 'us-east-1',
    });
    const res = await db.scan({ TableName: 'testdb' }).promise();
    return res.Items;
  }
}
