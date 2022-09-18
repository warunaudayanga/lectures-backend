import {MigrationInterface, QueryRunner} from "typeorm";

export class createEntitiesForPoll1663487095776 implements MigrationInterface {
    name = 'createEntitiesForPoll1663487095776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`poll_vote\` (\`id\` int NOT NULL AUTO_INCREMENT, \`option\` json NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`pollId\` int NOT NULL, \`createdById\` int NULL, \`updatedById\` int NULL, \`deletedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`polls\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`endTime\` datetime NULL, \`startTime\` datetime NULL, \`options\` json NOT NULL, \`requireIdentity\` tinyint NOT NULL DEFAULT 0, \`removable\` tinyint NOT NULL DEFAULT 0, \`updatable\` tinyint NOT NULL DEFAULT 0, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'INACTIVE', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdById\` int NULL, \`updatedById\` int NULL, \`deletedById\` int NULL, UNIQUE INDEX \`CODE\` (\`code\`), UNIQUE INDEX \`NAME\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`poll_voters\` (\`userId\` int NOT NULL, \`pollId\` int NOT NULL, INDEX \`IDX_20886b39c3b5c2fd3dee38d1a6\` (\`userId\`), INDEX \`IDX_224f39616e4c1b63ff2177614c\` (\`pollId\`), PRIMARY KEY (\`userId\`, \`pollId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`poll_vote\` ADD CONSTRAINT \`FK_99f9db6d3dae2a0aebebbf8e10a\` FOREIGN KEY (\`pollId\`) REFERENCES \`polls\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`poll_vote\` ADD CONSTRAINT \`FK_d2111f62d61ed3f6a8ce0ad8e5f\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`poll_vote\` ADD CONSTRAINT \`FK_42127731cfc5448f5ff661bea07\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`poll_vote\` ADD CONSTRAINT \`FK_0c3a12271b24a356b67c4ddace9\` FOREIGN KEY (\`deletedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`polls\` ADD CONSTRAINT \`FK_9f427450a5df5e35ec87d8a0e75\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`polls\` ADD CONSTRAINT \`FK_702ebd8e69570ca46bdb0f593ee\` FOREIGN KEY (\`updatedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`polls\` ADD CONSTRAINT \`FK_1dae36ec5b341d6d2e271700684\` FOREIGN KEY (\`deletedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`poll_voters\` ADD CONSTRAINT \`FK_20886b39c3b5c2fd3dee38d1a60\` FOREIGN KEY (\`userId\`) REFERENCES \`polls\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`poll_voters\` ADD CONSTRAINT \`FK_224f39616e4c1b63ff2177614c5\` FOREIGN KEY (\`pollId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`poll_voters\` DROP FOREIGN KEY \`FK_224f39616e4c1b63ff2177614c5\``);
        await queryRunner.query(`ALTER TABLE \`poll_voters\` DROP FOREIGN KEY \`FK_20886b39c3b5c2fd3dee38d1a60\``);
        await queryRunner.query(`ALTER TABLE \`polls\` DROP FOREIGN KEY \`FK_1dae36ec5b341d6d2e271700684\``);
        await queryRunner.query(`ALTER TABLE \`polls\` DROP FOREIGN KEY \`FK_702ebd8e69570ca46bdb0f593ee\``);
        await queryRunner.query(`ALTER TABLE \`polls\` DROP FOREIGN KEY \`FK_9f427450a5df5e35ec87d8a0e75\``);
        await queryRunner.query(`ALTER TABLE \`poll_vote\` DROP FOREIGN KEY \`FK_0c3a12271b24a356b67c4ddace9\``);
        await queryRunner.query(`ALTER TABLE \`poll_vote\` DROP FOREIGN KEY \`FK_42127731cfc5448f5ff661bea07\``);
        await queryRunner.query(`ALTER TABLE \`poll_vote\` DROP FOREIGN KEY \`FK_d2111f62d61ed3f6a8ce0ad8e5f\``);
        await queryRunner.query(`ALTER TABLE \`poll_vote\` DROP FOREIGN KEY \`FK_99f9db6d3dae2a0aebebbf8e10a\``);
        await queryRunner.query(`DROP INDEX \`IDX_224f39616e4c1b63ff2177614c\` ON \`poll_voters\``);
        await queryRunner.query(`DROP INDEX \`IDX_20886b39c3b5c2fd3dee38d1a6\` ON \`poll_voters\``);
        await queryRunner.query(`DROP TABLE \`poll_voters\``);
        await queryRunner.query(`DROP INDEX \`NAME\` ON \`polls\``);
        await queryRunner.query(`DROP INDEX \`CODE\` ON \`polls\``);
        await queryRunner.query(`DROP TABLE \`polls\``);
        await queryRunner.query(`DROP TABLE \`poll_vote\``);
    }

}
