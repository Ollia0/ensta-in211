import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class True1747128348259 {
    name = 'True1747128348259'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "firstname"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "lastname"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "username" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password" character varying NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "lastname" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "firstname" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "email" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
        `);
    }
}
