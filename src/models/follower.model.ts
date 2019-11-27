import { Entity, model, property } from '@loopback/repository';

@model({ strictObjectIDCoercion: true })
export class Follower extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: { dataType: 'ObjectID' },
  })
  id?: string;

  @property({
    type: 'string',
    mongodb: { dataType: 'ObjectID' },
    required: true,
  })
  user_id: string;

  @property({
    type: 'string',
    mongodb: { dataType: 'ObjectID' },
    required: true,
  })
  followed_by: string;

  @property({
    type: 'date',
    required: true,
  })
  created_by: string;

  @property({
    type: 'date',
  })
  updated_at?: string;


  constructor(data?: Partial<Follower>) {
    super(data);
  }
}

export interface FollowerRelations {
  // describe navigational properties here
}

export type FollowerWithRelations = Follower & FollowerRelations;
