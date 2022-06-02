import { CreateTimetableDto } from "./create-timetable.dto";
import { IsOptional, Matches } from "class-validator";
import configuration from "../../../core/config/configuration";
import { DateOnly } from "../../../core/interfaces";

export class CreateScheduleDto extends CreateTimetableDto {
    @Matches(configuration().regex.dateOnly)
    @IsOptional()
    date?: DateOnly;
}
