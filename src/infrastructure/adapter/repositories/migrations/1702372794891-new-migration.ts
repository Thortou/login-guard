import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1702372794891 implements MigrationInterface {
    name = 'NewMigration1702372794891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying, "tel" character varying, "gmail" character varying, "password" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "first_name" character varying, "last_name" character varying, "gender" character varying, "dob" TIMESTAMP, "user_id" integer, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "REL_9e432b7df0d182f8d292902d1a" UNIQUE ("user_id"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_to_permission" ("role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_ac8e72c29abc2d6c4cf590856c9" PRIMARY KEY ("role_id", "permission_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ac652a18fe944c79c5a9e87c8f" ON "role_to_permission" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9dc2c10538df147048ce967258" ON "role_to_permission" ("permission_id") `);
        await queryRunner.query(`CREATE TABLE "user_to_role" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_ebeca66c6362a547803adc9c9ce" PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf3d99d0316e0fb041a6a61738" ON "user_to_role" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cbe516445858eb55127cbaa680" ON "user_to_role" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_to_permission" ADD CONSTRAINT "FK_ac652a18fe944c79c5a9e87c8ff" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_to_permission" ADD CONSTRAINT "FK_9dc2c10538df147048ce9672589" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_role" ADD CONSTRAINT "FK_cf3d99d0316e0fb041a6a61738d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_role" ADD CONSTRAINT "FK_cbe516445858eb55127cbaa6801" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_to_role" DROP CONSTRAINT "FK_cbe516445858eb55127cbaa6801"`);
        await queryRunner.query(`ALTER TABLE "user_to_role" DROP CONSTRAINT "FK_cf3d99d0316e0fb041a6a61738d"`);
        await queryRunner.query(`ALTER TABLE "role_to_permission" DROP CONSTRAINT "FK_9dc2c10538df147048ce9672589"`);
        await queryRunner.query(`ALTER TABLE "role_to_permission" DROP CONSTRAINT "FK_ac652a18fe944c79c5a9e87c8ff"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cbe516445858eb55127cbaa680"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf3d99d0316e0fb041a6a61738"`);
        await queryRunner.query(`DROP TABLE "user_to_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9dc2c10538df147048ce967258"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac652a18fe944c79c5a9e87c8f"`);
        await queryRunner.query(`DROP TABLE "role_to_permission"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
