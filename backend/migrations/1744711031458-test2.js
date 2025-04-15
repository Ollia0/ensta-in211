import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Test21744711031458 {
    name = 'Test21744711031458'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "releasedate" character varying NOT NULL,
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title"),
                CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_2df2f913ab85b7cfc27657171e4"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "title"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "releasedate"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "releasedate" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "title" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_2df2f913ab85b7cfc27657171e4" UNIQUE ("title")
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
