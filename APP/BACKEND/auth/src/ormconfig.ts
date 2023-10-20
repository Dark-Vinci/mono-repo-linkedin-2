import { DataSource } from 'typeorm';

export default new DataSource({
  // type: 'postgres',
  // host: 'localhost',
  // port: 5420,
  // database: 'my_database',

  // entities: ['dist/models/*.{js, ts}'],
  // migrations: ['migrations/*{.js,.ts}'],
  // username: 'docker',
  // password: 'docker',
  // synchronize: false,

  // {
  type: 'postgres',
  host: 'localhost',
  port: 5420,
  database: 'my_database',

  entities: ['src/models/*.{js, ts}'],
  migrations: ['migrations/*{.js,.ts}'],
  username: 'docker',
  password: 'docker',
  synchronize: false,
});

// ormconfig.ts
// exports default const = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5420,
//   database: 'my_database',

//   entities: ['dist/models/*.{js, ts}'],
//   migrations: ['migrations/*{.js,.ts}'],
//   username: 'docker',
//   password: 'docker',
//   synchronize: false,
//   cli: {
//     migrationsDir: 'src/migration',
//   },
// };

// console.log({ AppDataSource: AppDataSource.options });

// export default AppDataSource;
