import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class True1747685337768 {
    name = 'True1747685337768'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "profilePicture" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "descrition" character varying NOT NULL DEFAULT ''
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "descrition"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "profilePicture"
        `);
    }
}
