import { Type } from "class-transformer";
import { IsArray, IsOptional, ValidateNested } from "class-validator";
import { CreateTimetableEntryDto } from "./create-timetable-entry.dto";
import { UpdateTimetableEntryDto } from "./update-timetable-entry.dto";

export class SaveTimetableDto {
    @ValidateNested({ each: true })
    @Type(() => CreateTimetableEntryDto)
    @IsArray()
    @IsOptional()
    create: CreateTimetableEntryDto[];

    @ValidateNested({ each: true })
    @Type(() => UpdateTimetableEntryDto)
    @IsArray()
    @IsOptional()
    update: UpdateTimetableEntryDto[];

    @IsArray()
    @IsOptional()
    delete: number[];
}
