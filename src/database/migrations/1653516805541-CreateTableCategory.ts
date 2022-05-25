import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableCategory1653516805541 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "categorys",
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

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("categorys");
    }

}
