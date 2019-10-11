import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';

@table('books')
export default class Book {
  @hashKey()
  id: number;

  @attribute()
  title: string;

  @rangeKey({ defaultProvider: () => new Date() })
  createdAt: Date;

  @attribute()
  completed?: boolean;
}
