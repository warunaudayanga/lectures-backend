import { EntityRepository, getConnection, In } from "typeorm";
import { Timetable } from "../entities";
import { BaseRepository, EntityUtils, IStatusResponse, Operation } from "../../../core/entity";
import { User } from "../../user/entities";
import { SaveTimetableDto } from "../dtos/save-timetable.dto";

@EntityRepository(Timetable)
export class TimetableRepository extends BaseRepository<Timetable> {
    async saveBulk(saveTimetableDto: SaveTimetableDto, user: User): Promise<IStatusResponse> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        try {
            let successful = true;
            await queryRunner.startTransaction();

            // Create
            for await (const createTimetableEntryDto of saveTimetableDto.create) {
                const entry = await queryRunner.manager.save(Timetable, {
                    ...createTimetableEntryDto,
                    updatedBy: user,
                });
                if (!entry) {
                    successful = false;
                }
            }

            // Update
            for await (const updateTimetableEntryDto of saveTimetableDto.update) {
                const { id, ...dto } = updateTimetableEntryDto;
                const { affected } = await queryRunner.manager.update(Timetable, id, { ...dto, updatedBy: user });
                if (affected === 0) {
                    successful = false;
                }
            }

            // Delete
            if (saveTimetableDto.delete.length) {
                const { affected } = await queryRunner.manager.delete(Timetable, { id: In(saveTimetableDto.delete) });
                if (affected === 0) {
                    successful = false;
                }
            }

            if (successful) {
                await queryRunner.commitTransaction();
            } else {
                await queryRunner.rollbackTransaction();
                await queryRunner.release();
            }

            return EntityUtils.handleSuccess(Operation.SAVE, "timetable");
        } catch (e: any) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            EntityUtils.handleError(e, "timetable", "day and slot");
        }
    }
}
