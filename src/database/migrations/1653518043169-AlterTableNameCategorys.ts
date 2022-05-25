import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableNameCategorys1653518043169 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.renameTable("categorys", "categories");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.renameTable("categories", "categorys");
    }

}
