import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'stocker',
  entities: [
    'src/models/*{.ts,.js}',
  ],
  migrations: [
    'src/database/migrations/*{.ts,.js}',
  ],
});

dataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default dataSource;
