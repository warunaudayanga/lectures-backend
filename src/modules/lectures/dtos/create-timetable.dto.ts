import { IsEnum, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { BaseDto } from "../../../core/entity";
import { Day } from "../../../core/enums";
import configuration from "../../../core/config/configuration";
import { Course, CourseModule, Lecturer, Slot } from "../entities";

export class CreateTimetableDto extends BaseDto {
    @IsNotEmpty()
    course: Course;

    @IsNotEmpty()
    module: CourseModule;

    @IsNotEmpty()
    lecturer: Lecturer;

    @IsOptional()
    lecturerL2?: Lecturer;

    @Matches(configuration().regex.year)
    @IsNotEmpty()
    year: string;

    @IsEnum(Object.values(Day))
    @IsNotEmpty()
    day: Day;

    @IsNotEmpty()
    slot: Slot;

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
