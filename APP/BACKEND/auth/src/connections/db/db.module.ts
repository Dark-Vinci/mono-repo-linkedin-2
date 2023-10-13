import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

type NodeEnvType = 'development' | 'production' | 'test';

type DBType = 'postgres';

interface configInterface {
  readonly dbPort: number;
  readonly dbHost: string;
  readonly dbMasterPassword: string;
  readonly dbSlavePassword: string;
  readonly dbUserName: string;
  readonly nodeEnv: NodeEnvType;
  readonly type: DBType;
}

enum AuthDatabase {
  MASTER = 'auth_master',
  SLAVE1 = 'auth_slave1',
  SLAVE2 = 'auth_slave2',
  SLAVE3 = 'auth_slave3',
}

enum DBPassword {
  MASTER = 'dbMasterPassword',
  SLAVE = 'dbSlavePassword',
}

const DB_PORT = 'dbPort' as const;
const HOST = 'dbHost' as const;
const USERNAME = 'dbUserName' as const;
const DB_LOGGER = 'advanced-console' as const;
const DB_TYPE = 'type' as const;
const POSTGRES = 'postgres' as const;

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
              port: get(DB_PORT) as number,
              host: get(HOST) as string,
              database: AuthDatabase.MASTER,
              username: get(USERNAME) as string,
              password: get(DBPassword.MASTER) as string,
            },
            slaves: [
              {
                port: get(DB_PORT) as number,
                host: get(HOST) as string,
                database: AuthDatabase.SLAVE1,
                username: get(USERNAME) as string,
                password: get(DBPassword.SLAVE) as string,
              },
              {
                port: get(DB_PORT) as number,
                host: get(HOST) as string,
                database: AuthDatabase.SLAVE2,
                username: get(USERNAME) as string,
                password: get(DBPassword.SLAVE) as string,
              },
              {
                port: get(DB_PORT) as number,
                host: get(HOST) as string,
                database: AuthDatabase.SLAVE3,
                username: get(USERNAME) as string,
                password: get(DBPassword.SLAVE) as string,
              },
            ],
          },
        };

        return connectionConfig satisfies Partial<TypeOrmModuleOptions>;
      },
    });
  }
}
