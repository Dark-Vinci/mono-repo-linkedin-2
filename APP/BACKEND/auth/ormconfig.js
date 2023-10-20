export default  {
  type: 'postgres',
  host: 'localhost',
  port: 5420,
  database: 'my_database',

  entities: ['dist/models/*.{js, ts}'],
  migrations: ['migrations/*{.js,.ts}'],
  username: 'docker',
  password: 'docker',
  synchronize: false,
  cli: {
    migrationsDir: 'src/migration',
  },
};
