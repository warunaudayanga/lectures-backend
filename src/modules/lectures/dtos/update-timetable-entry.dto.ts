import { ICourseModule, ILecturer } from "../interfaces";
import { Day } from "../../../core/enums";
import { ISlot } from "../interfaces/slot.interface";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateTimetableEntryDto {
    @IsNotEmpty()
    id: number;

    @IsOptional()
    slot: ISlot;

    @IsOptional()
    day: Day;

    @IsOptional()
    lecturer: ILecturer;

    @IsOptional()
    module: ICourseModule;
}
