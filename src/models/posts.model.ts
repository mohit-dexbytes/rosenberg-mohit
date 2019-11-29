import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Posts extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  post_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  post_title: string;

  @property({
    type: 'object',
    default: null,
  })
  post_checkin?: object;

  @property({
    type: 'string',
    required: true,
  })
  user_id: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  created_at: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  updated_at?: string;

  @property({
    type: 'boolean',
    default: true,
  })
  is_active?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  deleted?: boolean;

  @property({
    type: 'array',
    itemType: 'string',
  })
  post_liked?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  post_images?: object[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Posts>) {
    super(data);
  }
}

export interface PostsRelations {
  // describe navigational properties here
}

export type PostsWithRelations = Posts & PostsRelations;
