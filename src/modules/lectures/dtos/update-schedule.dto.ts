import { UpdateTimetableDto } from "./update-timetable.dto";
import { IsOptional, Matches } from "class-validator";
import configuration from "../../../core/config/configuration";
import { DateOnly } from "../../../core/interfaces";

export class UpdateScheduleDto extends UpdateTimetableDto {
    @Matches(configuration().regex.dateOnly)
    @IsOptional()
    date?: DateOnly;
}
