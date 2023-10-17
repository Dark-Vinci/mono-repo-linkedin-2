import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import {
  DB_PORT,
  HOST,
  USERNAME,
  DB_LOGGER,
  DB_TYPE,
  POSTGRES,
} from '@constants';
import { AuthDatabase, DBPassword, configInterface } from '@types';

@Module({})
export class DB {
  public static connect(): DynamicModule {
    return TypeOrmModule.forRootAsync({
      inject: [ConfigModule],
      useFactory: (config: ConfigService<configInterface>) => {
        const get = config.get;

        const connectionConfig = {
          username: get(USERNAME) as string,
          logging: true,
          logger: DB_LOGGER,
          type: get(DB_TYPE) || POSTGRES,
          synchronize: false,
          replication: {
            master: {
              port: +get(DB_PORT),
              host: get(HOST) as string,
              database: AuthDatabase.MASTER,
              username: get(USERNAME) as string,
              password: get(DBPassword.MASTER) as string,
            },
            slaves: [
              {
                port: +get(DB_PORT),
                host: get(HOST) as string,
                database: AuthDatabase.SLAVE1,
                username: get(USERNAME) as string,
                password: get(DBPassword.SLAVE) as string,
                name: AuthDatabase.SLAVE1,
              },
              {
                port: +get(DB_PORT),
                host: get(HOST) as string,
                database: AuthDatabase.SLAVE2,
                username: get(USERNAME) as string,
                password: get(DBPassword.SLAVE) as string,
                name: AuthDatabase.SLAVE2,
              },
              {
                port: +get(DB_PORT),
                host: get(HOST) as string,
                database: AuthDatabase.SLAVE3,
                username: get(USERNAME) as string,
                password: get(DBPassword.SLAVE) as string,
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
