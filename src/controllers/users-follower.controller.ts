import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Users,
  Follower,
} from '../models';
import { UsersRepository } from '../repositories';

export class UsersFollowerController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/followers', {
    responses: {
      '200': {
        description: 'Array of Follower\'s belonging to Users',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Follower) },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Follower>,
  ) {
    const queryResult = await this.usersRepository.followers(id).find(filter);
    let followerIds: string[] = [];
    queryResult.map((obj) => {
      followerIds = [...followerIds, obj.followed_by];
    });
    const userDetails = await this.usersRepository.find({ where: { id: { inq: followerIds } } });
    return userDetails;
  }

  @post('/users/{id}/followers', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Follower) } },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Follower, {
            title: 'NewFollowerInUsers',
            exclude: ['id'],
            optional: ['user_id']
          }),
        },
      },
    }) follower: Omit<Follower, 'id'>,
  ): Promise<Follower> {
    return this.usersRepository.followers(id).create(follower);
  }

  @patch('/users/{id}/followers', {
    responses: {
      '200': {
        description: 'Users.Follower PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Follower, { partial: true }),
        },
      },
    })
    follower: Partial<Follower>,
    @param.query.object('where', getWhereSchemaFor(Follower)) where?: Where<Follower>,
  ): Promise<Count> {
    return this.usersRepository.followers(id).patch(follower, where);
  }

  @del('/users/{id}/followers', {
    responses: {
      '200': {
        description: 'Users.Follower DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Follower)) where?: Where<Follower>,
  ): Promise<Count> {
    return this.usersRepository.followers(id).delete(where);
  }
}
