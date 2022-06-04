import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1651694920326 implements MigrationInterface {
  name = 'SeedDB1651694920326';

  //Banks
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO banks (name, balance) VALUES ('MONO', 100), ('PRIVATE', 100), ('CREDIT', 100)`,
    );

    //Transactions
    //MONO
    await queryRunner.query(
      `INSERT INTO transactions (title, amount, "valueType", "bankNameId") VALUES ('MONO title', 100, 'PROFITABLE', 1), ('MONO title2', 100, 'PROFITABLE', 1)`,
    );
    //PRIVATE
    await queryRunner.query(
      `INSERT INTO transactions (title, amount, "valueType", "bankNameId") VALUES ('PRIVATE title', 100, 'PROFITABLE', 2), ('PRIVATE title2', -50, 'CONSUMABLE', 2)`,
    );
    //CREDIT
    await queryRunner.query(
      `INSERT INTO transactions (title, amount, "valueType", "bankNameId") VALUES ('CREDIT title', -100, 'CONSUMABLE', 3), ('CREDIT title2', -100, 'CONSUMABLE', 3)`,
    );

    //Categories
    await queryRunner.query(
      `INSERT INTO categories (name, description, "transactionsNameId") VALUES ('first-Category', 'description', 1)`,
    );
    await queryRunner.query(
      `INSERT INTO categories (name, description, "transactionsNameId") VALUES ('second-Category', 'description', 2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
