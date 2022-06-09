import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1654756657157 implements MigrationInterface {
    name = 'initial1654756657157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lecturer\` CHANGE \`name\` \`name\` varchar(255) AS (CONCAT(title, ' ', firstName, ' ', lastName)) STORED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`timetable\` CHANGE \`status\` \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) AS (CONCAT(firstName, ' ', lastName)) STORED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`courseString\` \`courseString\` varchar(255) AS (CONCAT(code, '/', SUBSTRING(year, 3, 4), '/', IF(type='FULL_TIME', 'B1', 'B2'))) STORED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`modules\` CHANGE \`code\` \`code\` varchar(255) AS (CONCAT(department, semester, IF(LENGTH(credits)=1, CONCAT(0, credits), credits), SERIAL, IF(revised, 1, 0))) STORED NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`modules\` CHANGE \`code\` \`code\` varchar(255) AS (concat(\`department\`,\`semester\`,if((length(\`credits\`) = 1),concat(0,\`credits\`),\`credits\`),\`serial\`,if(\`revised\`,1,0))) STORED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`courseString\` \`courseString\` varchar(255) AS (concat(\`code\`,_utf8mb4\'/\',substr(\`year\`,3,4),_utf8mb4\'/\',if((\`type\` = _utf8mb4\'FULL_TIME\'),_utf8mb4\'B1\',_utf8mb4\'B2\'))) STORED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) AS (concat(\`firstName\`,_utf8mb4\' \',\`lastName\`)) STORED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`timetable\` CHANGE \`status\` \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE'`);
        await queryRunner.query(`ALTER TABLE \`lecturer\` CHANGE \`name\` \`name\` varchar(255) AS (concat(\`title\`,_utf8mb4\' \',\`firstName\`,_utf8mb4\' \',\`lastName\`)) STORED NOT NULL`);
    }

}
