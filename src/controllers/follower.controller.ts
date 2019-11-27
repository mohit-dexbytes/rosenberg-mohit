import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Follower } from '../models';
import { FollowerRepository } from '../repositories';

export class FollowerController {
  constructor(
    @repository(FollowerRepository)
    public followerRepository: FollowerRepository,
  ) { }

  @post('/followers', {
    responses: {
      '200': {
        description: 'Follower model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Follower) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Follower, {
            title: 'NewFollower',
            exclude: ['id'],
          }),
        },
      },
    })
    follower: Omit<Follower, 'id'>,
  ): Promise<Follower> {
    return this.followerRepository.create(follower);
  }


  @get('/followers', {
    responses: {
      '200': {
        description: 'Array of Follower model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Follower) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Follower)) filter?: Filter<Follower>,
  ): Promise<Follower[]> {
    return this.followerRepository.find(filter);
  }

  @get('/followers/{id}', {
    responses: {
      '200': {
        description: 'Follower model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Follower) } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Follower> {
    return this.followerRepository.findById(id);
  }

}
