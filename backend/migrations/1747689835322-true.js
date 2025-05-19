import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class True1747689835322 {
    name = 'True1747689835322'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "descrition" TO "description"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "description" TO "descrition"
        `);
    }
}
