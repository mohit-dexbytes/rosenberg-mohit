import {DefaultCrudRepository} from '@loopback/repository';
import {Users, UsersRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export type Credentials = {
  email: string;
  password: string;
};

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Users, dataSource);
  }
}
