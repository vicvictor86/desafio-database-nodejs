import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableTransaction1653515930816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "transactions",
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
                    name: "value",
                    type: "decimal",
                    isNullable: false,
                },
                {
                    name: "type",
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
        await queryRunner.dropTable('transactions');
    }

}
