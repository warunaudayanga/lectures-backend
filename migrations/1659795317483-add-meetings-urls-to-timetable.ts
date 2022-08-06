import {MigrationInterface, QueryRunner} from "typeorm";

export class addMeetingsUrlsToTimetable1659795317483 implements MigrationInterface {
    name = 'addMeetingsUrlsToTimetable1659795317483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timetable\` ADD \`meetingsUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`timetable\` ADD \`meetingsUrlL2\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`timetable\` DROP COLUMN \`meetingsUrlL2\``);
        await queryRunner.query(`ALTER TABLE \`timetable\` DROP COLUMN \`meetingsUrl\``);
    }

}
