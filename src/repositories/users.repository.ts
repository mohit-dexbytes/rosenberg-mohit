import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Users, UsersRelations, Follower} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {FollowerRepository} from './follower.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly followers: HasManyRepositoryFactory<Follower, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('FollowerRepository') protected followerRepositoryGetter: Getter<FollowerRepository>,
  ) {
    super(Users, dataSource);
    this.followers = this.createHasManyRepositoryFactoryFor('followers', followerRepositoryGetter,);
    this.registerInclusionResolver('followers', this.followers.inclusionResolver);
  }
}
