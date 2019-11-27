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
import { Users } from '../models';
import { validateCredentials } from '../services/validator';
import { UsersRepository, Credentials, FollowerRepository } from '../repositories';
import ResponseObject from '../Helpers/ResponseObject';
import {
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';
import { inject } from '@loopback/core';
import {
  TokenServiceBindings,
  PasswordHasherBindings,
  UserServiceBindings
} from '../keys';
import { SECURITY_SPEC } from '../utils/security-spec';
import { PasswordHasher } from '../services/hash.password.bcryptjs';
import { UserProfile, securityId, SecurityBindings } from '@loopback/security';
import {
  CredentialsRequestBody,
  UserProfileSchema,
} from './specs/user-controller.specs';
import * as _ from 'lodash';
const ObjectID = require('mongodb').ObjectID;


export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,

    @repository(FollowerRepository)
    public followerRepository: FollowerRepository,

    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,

    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,

    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<Users, Credentials>,
  ) { }

  @post('/users/register', {
    responses: {
      '200': {
        description: 'User Registration',
        content: { 'application/json': { schema: getModelSchemaRef(Users) } },
      },
    },
  })
  async userRegistration(@requestBody() Users: Omit<Users, 'id'>) {

    // ensure a valid email value and password value
    validateCredentials(_.pick(Users, ['email', 'password']));
    const checkEmail = await this.usersRepository.findOne({ where: { email: Users.email } });
    if (!checkEmail) {
      // encrypt the password
      // eslint-disable-next-line require-atomic-updates
      Users.password = await this.passwordHasher.hashPassword(Users.password);
      await this.usersRepository.create(Users);
      return new ResponseObject(201, "User registered successfully", "");
    } else {
      return new ResponseObject(404, "Invalid email", "");
    }
  }

  @post('/users/login')
  async login(@requestBody(CredentialsRequestBody) credentials: Credentials):
    Promise<{ response: object }> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);
    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    const userDetails = { ...user, token };
    const response = new ResponseObject(200, "User login successfully", userDetails);
    return { response };
  }

  @post('/users/{id}/follower')
  async follower(@param.path.string('id') id: string) {
    const data = await this.followerRepository.find({ where: { user_id: id } });
    return data;
  }
}
