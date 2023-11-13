import { DataSource } from 'typeorm';

import { Business, User } from '@models';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5420,
  database: 'new_db',

  entities: [Business, User],
  migrations: ['migrations/*{.js,.ts}'],
  username: 'docker',
  password: 'docker',
  synchronize: false,
});

export default dataSource;
