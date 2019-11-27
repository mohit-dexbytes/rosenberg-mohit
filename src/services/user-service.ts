// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/authentication
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
import { HttpErrors } from '@loopback/rest';
import { Credentials, UsersRepository } from '../repositories/users.repository';
import { Users } from '../models/users.model';
import { UserService } from '@loopback/authentication';
import { UserProfile, securityId } from '@loopback/security';
import { repository } from '@loopback/repository';
import { PasswordHasher } from './hash.password.bcryptjs';
import { PasswordHasherBindings } from '../keys';
import { inject } from '@loopback/context';

export class MyUserService implements UserService<Users, Credentials> {
  constructor(
    @repository(UsersRepository) public UsersRepository: UsersRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) { }

  async verifyCredentials(credentials: Credentials): Promise<Users> {
    const invalidCredentialsError = 'Invalid email or password.';

    const foundUser = await this.UsersRepository.findOne({
      where: { email: credentials.email },
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user: Users): UserProfile {
    // since first name and lastName are optional, no error is thrown if not provided
    let userName = '';
    if (user.first_name) userName = `${user.first_name}`;
    if (user.last_name)
      userName = user.first_name
        ? `${userName} ${user.last_name}`
        : `${user.last_name}`;
    return { [securityId]: `${user.id}`, name: userName, id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email };
  }
}
