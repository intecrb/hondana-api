import { Injectable } from '@nestjs/common';

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
}
