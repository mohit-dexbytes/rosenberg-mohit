import {DefaultCrudRepository} from '@loopback/repository';
import {Follower, FollowerRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FollowerRepository extends DefaultCrudRepository<
  Follower,
  typeof Follower.prototype.id,
  FollowerRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Follower, dataSource);
  }
}
