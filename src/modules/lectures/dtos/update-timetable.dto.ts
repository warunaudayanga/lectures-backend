import { IsEnum, IsOptional } from "class-validator";
import { BaseDto } from "../../../core/entity";
import { Day } from "../../../core/enums";
import { ICourse, ICourseModule, ILecturer } from "../interfaces";
import { ISlot } from "../interfaces/slot.interface";

export class UpdateTimetableDto extends BaseDto {
    @IsOptional()
    course: ICourse;

    @IsOptional()
    module: ICourseModule;

    @IsOptional()
    lecturer: ILecturer;

    @IsEnum(Object.values(Day))
    @IsOptional()
    day: Day;

    @IsOptional()
    slot?: ISlot;
}
