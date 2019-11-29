import { Entity, model, property, hasMany } from '@loopback/repository';
import { Follower } from './follower.model';

@model({
  settings: {
    strictObjectIDCoercion: true,
  }
})
export class Users extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: { dataType: 'ObjectID' },
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  first_name: string;

  @property({
    type: 'string',
    required: true,
  })
  last_name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  company: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  job_position: string;

  @property({
    type: 'date',
    required: true,
  })
  year: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  created_at: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @hasMany(() => Follower, { keyTo: 'user_id' })
  followers: Follower[];

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
