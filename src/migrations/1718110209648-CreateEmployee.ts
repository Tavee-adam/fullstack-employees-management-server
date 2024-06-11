import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployee1718110209648 implements MigrationInterface {
  name = 'CreateEmployee1718110209648';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`employee\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`sex\` varchar(15) NOT NULL, \`birth\` date NOT NULL, \`address\` text NOT NULL, \`subDistrict\` varchar(255) NOT NULL, \`district\` varchar(255) NOT NULL, \`province\` varchar(255) NOT NULL, \`idCardExp\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`employee\``);
  }
}
