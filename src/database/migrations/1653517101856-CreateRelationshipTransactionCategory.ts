import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class CreateRelationshipTransactionCategory1653517101856 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("transactions", new TableColumn({
            name: "category_id",
            type: "uuid",
            isNullable: true,
        }));

        await queryRunner.createForeignKey("transactions", new TableForeignKey({
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "categorys",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey("transactions", "TransactionCategory");

        await queryRunner.dropColumn("transactionos", "category_id");
    }

}
