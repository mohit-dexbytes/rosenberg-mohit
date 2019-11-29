import {DefaultCrudRepository} from '@loopback/repository';
import {Posts, PostsRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PostsRepository extends DefaultCrudRepository<
  Posts,
  typeof Posts.prototype.post_id,
  PostsRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Posts, dataSource);
  }
}
