import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableCategoriesWithIdAutoGenerate1653605115050 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("categories");
        await queryRunner.createTable(new Table({
            name: "categories",
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("categories");
        await queryRunner.createTable(new Table({
            name: "categories",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isNullable: false,
                    isPrimary: true,
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
    }

}
