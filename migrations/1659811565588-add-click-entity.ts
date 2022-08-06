import {MigrationInterface, QueryRunner} from "typeorm";

export class addClickEntity1659811565588 implements MigrationInterface {
    name = 'addClickEntity1659811565588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`clicks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('RECORDING', 'MEETING', 'DOCUMENTS', 'PLAYLIST', 'KUPPI') NOT NULL, \`button\` enum ('LEFT', 'RIGHT', 'MIDDLE') NOT NULL, \`schedule\` json NULL, \`timetable\` json NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`clicks\` ADD CONSTRAINT \`FK_9b889c96aee96c630e4a22e7412\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clicks\` DROP FOREIGN KEY \`FK_9b889c96aee96c630e4a22e7412\``);
        await queryRunner.query(`DROP TABLE \`clicks\``);
    }

}
