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
import {Posts} from '../models';
import {PostsRepository} from '../repositories';

export class PostsController {
  constructor(
    @repository(PostsRepository)
    public postsRepository : PostsRepository,
  ) {}

  @post('/user-posts', {
    responses: {
      '200': {
        description: 'Posts model instance',
        content: {'application/json': {schema: getModelSchemaRef(Posts)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posts, {
            title: 'NewPosts',
            exclude: ['post_id'],
          }),
        },
      },
    })
    posts: Omit<Posts, 'post_id'>,
  ): Promise<Posts> {
    return this.postsRepository.create(posts);
  }

  @get('/user-posts/count', {
    responses: {
      '200': {
        description: 'Posts model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Posts)) where?: Where<Posts>,
  ): Promise<Count> {
    return this.postsRepository.count(where);
  }

  @get('/user-posts', {
    responses: {
      '200': {
        description: 'Array of Posts model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Posts, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Posts)) filter?: Filter<Posts>,
  ): Promise<Posts[]> {
    return this.postsRepository.find(filter);
  }

  @patch('/user-posts', {
    responses: {
      '200': {
        description: 'Posts PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posts, {partial: true}),
        },
      },
    })
    posts: Posts,
    @param.query.object('where', getWhereSchemaFor(Posts)) where?: Where<Posts>,
  ): Promise<Count> {
    return this.postsRepository.updateAll(posts, where);
  }

  @get('/user-posts/{id}', {
    responses: {
      '200': {
        description: 'Posts model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Posts, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Posts)) filter?: Filter<Posts>
  ): Promise<Posts> {
    return this.postsRepository.findById(id, filter);
  }

  @patch('/user-posts/{id}', {
    responses: {
      '204': {
        description: 'Posts PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Posts, {partial: true}),
        },
      },
    })
    posts: Posts,
  ): Promise<void> {
    await this.postsRepository.updateById(id, posts);
  }

  @put('/user-posts/{id}', {
    responses: {
      '204': {
        description: 'Posts PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() posts: Posts,
  ): Promise<void> {
    await this.postsRepository.replaceById(id, posts);
  }

  @del('/user-posts/{id}', {
    responses: {
      '204': {
        description: 'Posts DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.postsRepository.deleteById(id);
  }
}
