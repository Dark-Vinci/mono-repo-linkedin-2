import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBussiness1698115751953 implements MigrationInterface {
  name = 'CreateBussiness1698115751953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.query(
        `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT 'CURRENT_TIMESTAMP', "updated_at" TIMESTAMP NOT NULL DEFAULT 'CURRENT_TIMESTAMP', "deleted_at" TIMESTAMP, "version" integer DEFAULT '1', "first_name" character varying NOT NULL, "first_name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
      ),
      queryRunner.query(
        `CREATE TABLE "businesses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT 'CURRENT_TIMESTAMP', "updated_at" TIMESTAMP NOT NULL DEFAULT 'CURRENT_TIMESTAMP', "deleted_at" TIMESTAMP, "version" integer DEFAULT '1', CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id"))`,
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.query(`DROP TABLE "businesses"`),
      queryRunner.query(`DROP TABLE "users"`),
    ]);
  }
}
