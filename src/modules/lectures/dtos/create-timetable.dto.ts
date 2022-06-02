import { IsEnum, IsNotEmpty, Matches } from "class-validator";
import { BaseDto } from "../../../core/entity";
import { Day } from "../../../core/enums";
import { ICourse, ICourseModule, ILecturer } from "../interfaces";
import { Year } from "../../../core/interfaces";
import configuration from "../../../core/config/configuration";
import { ISlot } from "../interfaces/slot.interface";

export class CreateTimetableDto extends BaseDto {
    @IsNotEmpty()
    course: ICourse;

    @IsNotEmpty()
    module: ICourseModule;

    @IsNotEmpty()
    lecturer: ILecturer;

    @Matches(configuration().regex.year)
    @IsNotEmpty()
    year: Year;

    @IsEnum(Object.values(Day))
    @IsNotEmpty()
    day: Day;

    @IsNotEmpty()
    slot: ISlot;
}
