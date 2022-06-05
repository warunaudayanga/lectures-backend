import { IsArray, IsNotEmpty, Matches, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateScheduleDto } from "./create-schedule.dto";
import { DateOnly } from "../../../core/interfaces";
import configuration from "../../../core/config/configuration";

export class SaveScheduleListDto {
    @ValidateNested({ each: true })
    @Type(() => CreateScheduleDto)
    @IsArray()
    schedules: CreateScheduleDto[];

    @Matches(configuration().regex.dateOnly)
    @IsNotEmpty()
    date: DateOnly[];
}
