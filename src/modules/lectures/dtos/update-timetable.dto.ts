import { IsEnum, IsOptional } from "class-validator";
import { BaseDto } from "../../../core/entity";
import { Day } from "../../../core/enums";
import { ICourse } from "../interfaces";
import { CourseModule, Lecturer, Slot } from "../entities";

// noinspection JSUnusedGlobalSymbols
export class UpdateTimetableDto extends BaseDto {
    @IsOptional()
    course?: ICourse;

    @IsOptional()
    module?: CourseModule;

    @IsOptional()
    lecturer?: Lecturer;

    @IsOptional()
    lecturerL2?: Lecturer;

    @IsEnum(Object.values(Day))
    @IsOptional()
    day?: Day;

    @IsOptional()
    slot?: Slot;

    @IsOptional()
    slotL2?: Slot;

    @IsOptional()
    meetingsUrl?: string;

    @IsOptional()
    recordingsUrl?: string;

    @IsOptional()
    documentsUrl?: string;

    @IsOptional()
    meetingsUrlL2?: string;

    @IsOptional()
    recordingsUrlL2?: string;

    @IsOptional()
    documentsUrlL2?: string;
}
