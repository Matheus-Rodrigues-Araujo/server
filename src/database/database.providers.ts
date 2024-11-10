import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const PostgresDataSource = new DataSource({
        type: 'postgres',
        host: process.env.HOST,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [],
        synchronize: process.env.SYNCHRONIZE === 'true',
      });

      return PostgresDataSource.initialize();
    },
  },
];
