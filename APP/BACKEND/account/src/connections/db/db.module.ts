import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AuthDatabase, DBPassword, configInterface } from 'sdk';

import { DB_PORT, HOST, USERNAME, DB_LOGGER, DB_TYPE } from '@constants';

@Module({})
export class DB {
  public static connect(): DynamicModule {
    return TypeOrmModule.forRootAsync({
      inject: [ConfigModule],
      useFactory: (config: ConfigService<configInterface>) => {
        const get = config.get;

        const connectionConfig = {
          namingStrategy: new SnakeNamingStrategy(),
          migrationsTableName: 'migrations',
          entities: [],
          migrations: [],
          logging: true,
          logger: DB_LOGGER,
          type: get(DB_TYPE)!,
          synchronize: false,
          migrationsRun: true,

          replication: {
            master: {
              name: AuthDatabase.MASTER,
              port: +get(DB_PORT),
              host: get(HOST)!,
              database: AuthDatabase.MASTER,
              username: get(USERNAME)!,
              password: get(DBPassword.MASTER)!,
            },
            slaves: [
              {
                port: +get(DB_PORT),
                host: get(HOST)!,
                database: AuthDatabase.SLAVE1,
                username: get(USERNAME)!,
                password: get(DBPassword.SLAVE)!,
                name: AuthDatabase.SLAVE1,
              },
              {
                port: +get(DB_PORT),
                host: get(HOST)!,
                database: AuthDatabase.SLAVE2,
                username: get(USERNAME)!,
                password: get(DBPassword.SLAVE)!,
                name: AuthDatabase.SLAVE2,
              },
              {
                port: +get(DB_PORT),
                host: get(HOST)!,
                database: AuthDatabase.SLAVE3,
                username: get(USERNAME)!,
                password: get(DBPassword.SLAVE)!,
                name: AuthDatabase.SLAVE3,
              },
            ],
          },
        };

        return connectionConfig as Partial<TypeOrmModuleOptions>;
      },
    });
  }
}
