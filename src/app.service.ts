import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class AppService {
  getHello(): any {
    return [
      {
        id: 4253879753,
        name: '日和の書',
      },
      {
        id: 5283530853,
        name: 'ドラゴンクエスト外伝',
      },
      {
        id: 4567898502,
        name: 'JavaScript Good Parts',
      },
    ];
  }

  async findBooks() {
    const db = new DynamoDB({
      endpoint: 'http://localhost:4569',
      region: 'us-east-1',
    });
    const res = await db.scan({ TableName: 'mydb' }).promise();
    return res.Items;
  }
}
