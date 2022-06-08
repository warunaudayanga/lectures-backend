import { IsEnum, IsOptional, Matches } from "class-validator";
import configuration from "../../../core/config/configuration";
import { DateOnly } from "../../../core/interfaces";
import { Timetable } from "../entities";
import { Day } from "../../../core/enums";
import { ILecturer } from "../interfaces";

export class UpdateScheduleDto {
    @IsOptional()
    entry?: Timetable;

    @IsOptional()
    lecturer?: ILecturer;

    @IsOptional()
    lecturerL2?: ILecturer;

    @IsEnum(Object.values(Day))
    @IsOptional()
    day?: Day;

    @Matches(configuration().regex.dateOnly)
    @IsOptional()
    date?: DateOnly;

    @IsEnum(Object.values(Day))
    @IsOptional()
    dayL2?: Day;

    @Matches(configuration().regex.dateOnly)
    @IsOptional()
    dateL2?: DateOnly;

    @IsOptional()
    slot?: number;

    @IsOptional()
    meetingId?: string;

    @IsOptional()
    recordingUrl?: string;

    @IsOptional()
    passcode?: string;

    @IsOptional()
    meetingUrl?: string;

    @IsOptional()
    documentsUrl?: string;

    @IsOptional()
    meetingIdL2?: string;

    @IsOptional()
    passcodeL2?: string;

    @IsOptional()
    meetingUrlL2?: string;

    @IsOptional()
    recordingUrlL2?: string;

    @IsOptional()
    documentsUrlL2?: string;
}
