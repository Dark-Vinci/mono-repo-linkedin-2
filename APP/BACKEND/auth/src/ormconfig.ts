import { DataSource } from 'typeorm';
import { Business } from './models/business';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5420,
  database: 'my_database',

  entities: [Business],
  migrations: ['migrations/*{.js,.ts}'],
  username: 'docker',
  password: 'docker',
  synchronize: false,
});

export default dataSource;
