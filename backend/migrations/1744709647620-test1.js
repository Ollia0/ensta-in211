import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Test11744709647620 {
    name = 'Test11744709647620'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "title" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_2df2f913ab85b7cfc27657171e4" UNIQUE ("title")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "releasedate" character varying NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "releasedate"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_2df2f913ab85b7cfc27657171e4"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "title"
        `);
    }
}
