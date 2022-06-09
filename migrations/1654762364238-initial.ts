import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1654762364238 implements MigrationInterface {
    name = 'initial1654762364238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`lecturer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` enum ('Mr', 'Ms', 'Dr') NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`mobile\` varchar(255) NOT NULL, \`profileImage\` varchar(255) NOT NULL, \`name\` varchar(255) AS (CONCAT(title, ' ', firstName, ' ', lastName)) STORED NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdById\` int NULL, \`updatedById\` int NULL, \`deletedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`slots\` (\`id\` int NOT NULL AUTO_INCREMENT, \`number\` int NOT NULL, \`startAt\` time NOT NULL, \`endAt\` time NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdById\` int NULL, \`updatedById\` int NULL, \`deletedById\` int NULL, UNIQUE INDEX \`IDX_10366cc29db69e828360e270b7\` (\`number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`timetable\` (\`id\` int NOT NULL AUTO_INCREMENT, \`day\` enum ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL, \`recordingsUrl\` varchar(255) NULL, \`documentsUrl\` varchar(255) NULL, \`recordingsUrlL2\` varchar(255) NULL, \`documentsUrlL2\` varchar(255) NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`courseId\` int NULL, \`moduleId\` int NOT NULL, \`lecturerId\` int NULL, \`lecturerL2Id\` int NULL, \`slotId\` int NOT NULL, \`slotL2Id\` int NULL, \`createdById\` int NULL, \`updatedById\` int NULL, \`deletedById\` int NULL, UNIQUE INDEX \`IDX_2f5b399ae387dbb299dc9300e2\` (\`day\`, \`slotId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`day\` enum ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL, \`dayL2\` enum ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NULL, \`date\` date NOT NULL DEFAULT '2022-06-09', \`dateL2\` date NULL, \`slot\` int NOT NULL, \`startAt\` time NOT NULL, \`endAt\` time NOT NULL, \`slotL2\` int NULL, \`startAtL2\` time NULL, \`endAtL2\` time NULL, \`meetingId\` varchar(255) NULL, \`passcode\` varchar(255) NULL, \`meetingUrl\` varchar(255) NULL, \`recordingUrl\` varchar(255) NULL, \`documentsUrl\` varchar(255) NULL, \`meetingIdL2\` varchar(255) NULL, \`passcodeL2\` varchar(255) NULL, \`meetingUrlL2\` varchar(255) NULL, \`recordingUrlL2\` varchar(255) NULL, \`documentsUrlL2\` varchar(255) NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`entryId\` int NULL, \`moduleId\` int NOT NULL, \`lecturerId\` int NULL, \`lecturerL2Id\` int NULL, \`createdById\` int NULL, \`updatedById\` int NULL, \`deletedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(20) NOT NULL, \`lastName\` varchar(20) NOT NULL, \`username\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`salt\` varchar(255) NOT NULL, \`profileImage\` varchar(255) NULL, \`courseVerified\` tinyint NOT NULL DEFAULT 0, \`studentId\` int NOT NULL, \`studentIdVerified\` tinyint NOT NULL DEFAULT 0, \`phone\` varchar(255) NULL, \`phoneVerified\` tinyint NOT NULL DEFAULT 0, \`email\` varchar(255) NULL, \`emailVerified\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(255) AS (CONCAT(firstName, ' ', lastName)) STORED NOT NULL, \`studentIdString\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`roleId\` int NULL, \`courseId\` int NULL, \`createdById\` int NULL, \`updatedById\` int NULL, \`deletedById\` int NULL, UNIQUE INDEX \`USERNAME\` (\`username\`), UNIQUE INDEX \`COURSE_STUDENT_ID\` (\`courseId\`, \`studentId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`permissions\` json NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdById\` int NULL, \`updatedById\` int NULL, \`deletedById\` int NULL, UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`modules\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`department\` enum ('IT', 'LS') NOT NULL, \`semester\` int NOT NULL, \`credits\` int NOT NULL, \`serial\` varchar(255) NOT NULL, \`revised\` tinyint NOT NULL, \`grouped\` tinyint NOT NULL, \`code\` varchar(255) AS (CONCAT(department, semester, IF(LENGTH(credits)=1, CONCAT(0, credits), credits), SERIAL, IF(revised, 1, 0))) STORED NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`courseId\` int NULL, \`createdById\` int NULL, \`updatedById\` int NULL, \`deletedById\` int NULL, UNIQUE INDEX \`IDX_28daee6bf4e28706f159557307\` (\`serial\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`courses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`year\` year NOT NULL, \`type\` enum ('FULL_TIME', 'PART_TIME') NOT NULL DEFAULT 'PART_TIME', \`courseString\` varchar(255) AS (CONCAT(code, '/', SUBSTRING(year, 3, 4), '/', IF(type='FULL_TIME', 'B1', 'B2'))) STORED NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdById\` int NULL, \`updatedById\` int NULL, \`deletedById\` int NULL, UNIQUE INDEX \`IDX_2373b82e2b42b07b2be53bfe6d\` (\`code\`, \`year\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`lecturer\` ADD CONSTRAINT \`FK_738d6801b41b491ac4cf541bf62\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lecturer\` ADD CONSTRAINT \`FK_a6d4776b1b1f354d17c94d29694\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lecturer\` ADD CONSTRAINT \`FK_0aab07795d13c4217fb7b3f8cc2\` FOREIGN KEY (\`deletedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`slots\` ADD CONSTRAINT \`FK_4de4e31a2ee9118655d9f1fc289\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`slots\` ADD CONSTRAINT \`FK_ffc3357b408ebfc08ca174d8a75\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`slots\` ADD CONSTRAINT \`FK_43bf6c8a1368052bd9c3f9213bd\` FOREIGN KEY (\`deletedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timetable\` ADD CONSTRAINT \`FK_9cc6b2c53c23571cad8390666f4\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timetable\` ADD CONSTRAINT \`FK_67a427c8b065fce2c2cb8e3e9fe\` FOREIGN KEY (\`moduleId\`) REFERENCES \`modules\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timetable\` ADD CONSTRAINT \`FK_e53b72b82aa2fc0fe6fd442c7a3\` FOREIGN KEY (\`lecturerId\`) REFERENCES \`lecturer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timetable\` ADD CONSTRAINT \`FK_4505f4be61fb5894ef5eaeccd1b\` FOREIGN KEY (\`lecturerL2Id\`) REFERENCES \`lecturer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timetable\` ADD CONSTRAINT \`FK_06a50d62fec91a9e44c0b6f314e\` FOREIGN KEY (\`slotId\`) REFERENCES \`slots\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timetable\` ADD CONSTRAINT \`FK_0a65188b3347b6f4180fd7cc883\` FOREIGN KEY (\`slotL2Id\`) REFERENCES \`slots\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timetable\` ADD CONSTRAINT \`FK_df8e14f8dd2dadc79b5ba450e68\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timetable\` ADD CONSTRAINT \`FK_da5dc30772f2fb04fdd739b582e\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`timetable\` ADD CONSTRAINT \`FK_5a17ad3d72f29f41b1ed7dedcff\` FOREIGN KEY (\`deletedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_31785b0e843bfad102c517f0e95\` FOREIGN KEY (\`entryId\`) REFERENCES \`timetable\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_407a68282d46d64aa3d15e702b0\` FOREIGN KEY (\`moduleId\`) REFERENCES \`modules\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_57af4c84347285d15f374214a2f\` FOREIGN KEY (\`lecturerId\`) REFERENCES \`lecturer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_45dc5297f5ac3bfb497c13a3d67\` FOREIGN KEY (\`lecturerL2Id\`) REFERENCES \`lecturer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_9c94e97526c0fc1a4d4a45af773\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_3a00d788b5cd9bee8468c268a23\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_2d10fb8e32153433dc5815f4666\` FOREIGN KEY (\`deletedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_3148e7834f4910fcc0ffa9ac9ed\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_51d635f1d983d505fb5a2f44c52\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_52e97c477859f8019f3705abd21\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_e9d50c91bd84f566ce0ac1acf44\` FOREIGN KEY (\`deletedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD CONSTRAINT \`FK_cec119ce18936c7b6c24142be3e\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD CONSTRAINT \`FK_5de46381983d514c100aaceb542\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD CONSTRAINT \`FK_f66a6e03aa65334c4f40e60e36e\` FOREIGN KEY (\`deletedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`modules\` ADD CONSTRAINT \`FK_83489b37212a5a547bde8f89014\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`modules\` ADD CONSTRAINT \`FK_7bac24105b727e578e93b93cc41\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`modules\` ADD CONSTRAINT \`FK_52f4afb79e2a9e8e0d3e80fafac\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`modules\` ADD CONSTRAINT \`FK_e68290184fcf4e2c95917f7f07b\` FOREIGN KEY (\`deletedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD CONSTRAINT \`FK_3fff66ead8c0964a1805eb194b3\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD CONSTRAINT \`FK_91581454942c66e40b309a80ec5\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD CONSTRAINT \`FK_76b95b8e8ee974f548cc1c71540\` FOREIGN KEY (\`deletedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`courses\` DROP FOREIGN KEY \`FK_76b95b8e8ee974f548cc1c71540\``);
        await queryRunner.query(`ALTER TABLE \`courses\` DROP FOREIGN KEY \`FK_91581454942c66e40b309a80ec5\``);
        await queryRunner.query(`ALTER TABLE \`courses\` DROP FOREIGN KEY \`FK_3fff66ead8c0964a1805eb194b3\``);
        await queryRunner.query(`ALTER TABLE \`modules\` DROP FOREIGN KEY \`FK_e68290184fcf4e2c95917f7f07b\``);
        await queryRunner.query(`ALTER TABLE \`modules\` DROP FOREIGN KEY \`FK_52f4afb79e2a9e8e0d3e80fafac\``);
        await queryRunner.query(`ALTER TABLE \`modules\` DROP FOREIGN KEY \`FK_7bac24105b727e578e93b93cc41\``);
        await queryRunner.query(`ALTER TABLE \`modules\` DROP FOREIGN KEY \`FK_83489b37212a5a547bde8f89014\``);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP FOREIGN KEY \`FK_f66a6e03aa65334c4f40e60e36e\``);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP FOREIGN KEY \`FK_5de46381983d514c100aaceb542\``);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP FOREIGN KEY \`FK_cec119ce18936c7b6c24142be3e\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_e9d50c91bd84f566ce0ac1acf44\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_52e97c477859f8019f3705abd21\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_51d635f1d983d505fb5a2f44c52\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_3148e7834f4910fcc0ffa9ac9ed\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_2d10fb8e32153433dc5815f4666\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_3a00d788b5cd9bee8468c268a23\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_9c94e97526c0fc1a4d4a45af773\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_45dc5297f5ac3bfb497c13a3d67\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_57af4c84347285d15f374214a2f\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_407a68282d46d64aa3d15e702b0\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_31785b0e843bfad102c517f0e95\``);
        await queryRunner.query(`ALTER TABLE \`timetable\` DROP FOREIGN KEY \`FK_5a17ad3d72f29f41b1ed7dedcff\``);
        await queryRunner.query(`ALTER TABLE \`timetable\` DROP FOREIGN KEY \`FK_da5dc30772f2fb04fdd739b582e\``);
        await queryRunner.query(`ALTER TABLE \`timetable\` DROP FOREIGN KEY \`FK_df8e14f8dd2dadc79b5ba450e68\``);
        await queryRunner.query(`ALTER TABLE \`timetable\` DROP FOREIGN KEY \`FK_0a65188b3347b6f4180fd7cc883\``);
        await queryRunner.query(`ALTER TABLE \`timetable\` DROP FOREIGN KEY \`FK_06a50d62fec91a9e44c0b6f314e\``);
        await queryRunner.query(`ALTER TABLE \`timetable\` DROP FOREIGN KEY \`FK_4505f4be61fb5894ef5eaeccd1b\``);
        await queryRunner.query(`ALTER TABLE \`timetable\` DROP FOREIGN KEY \`FK_e53b72b82aa2fc0fe6fd442c7a3\``);
        await queryRunner.query(`ALTER TABLE \`timetable\` DROP FOREIGN KEY \`FK_67a427c8b065fce2c2cb8e3e9fe\``);
        await queryRunner.query(`ALTER TABLE \`timetable\` DROP FOREIGN KEY \`FK_9cc6b2c53c23571cad8390666f4\``);
        await queryRunner.query(`ALTER TABLE \`slots\` DROP FOREIGN KEY \`FK_43bf6c8a1368052bd9c3f9213bd\``);
        await queryRunner.query(`ALTER TABLE \`slots\` DROP FOREIGN KEY \`FK_ffc3357b408ebfc08ca174d8a75\``);
        await queryRunner.query(`ALTER TABLE \`slots\` DROP FOREIGN KEY \`FK_4de4e31a2ee9118655d9f1fc289\``);
        await queryRunner.query(`ALTER TABLE \`lecturer\` DROP FOREIGN KEY \`FK_0aab07795d13c4217fb7b3f8cc2\``);
        await queryRunner.query(`ALTER TABLE \`lecturer\` DROP FOREIGN KEY \`FK_a6d4776b1b1f354d17c94d29694\``);
        await queryRunner.query(`ALTER TABLE \`lecturer\` DROP FOREIGN KEY \`FK_738d6801b41b491ac4cf541bf62\``);
        await queryRunner.query(`DROP INDEX \`IDX_2373b82e2b42b07b2be53bfe6d\` ON \`courses\``);
        await queryRunner.query(`DROP TABLE \`courses\``);
        await queryRunner.query(`DROP INDEX \`IDX_28daee6bf4e28706f159557307\` ON \`modules\``);
        await queryRunner.query(`DROP TABLE \`modules\``);
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`COURSE_STUDENT_ID\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`USERNAME\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`schedule\``);
        await queryRunner.query(`DROP INDEX \`IDX_2f5b399ae387dbb299dc9300e2\` ON \`timetable\``);
        await queryRunner.query(`DROP TABLE \`timetable\``);
        await queryRunner.query(`DROP INDEX \`IDX_10366cc29db69e828360e270b7\` ON \`slots\``);
        await queryRunner.query(`DROP TABLE \`slots\``);
        await queryRunner.query(`DROP TABLE \`lecturer\``);
    }

}
