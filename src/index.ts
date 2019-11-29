import { RosenbergMongoApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { RosenbergMongoApplication };

export async function main(options: ApplicationConfig = {}) {
  const app = new RosenbergMongoApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/users`);

  return app;
}
