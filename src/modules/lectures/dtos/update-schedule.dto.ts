import { IsEnum, IsOptional, Matches } from "class-validator";
import configuration from "../../../core/config/configuration";
import { Lecturer, Timetable } from "../entities";
import { Day } from "../../../core/enums";

export class UpdateScheduleDto {
    @IsOptional()
    entry?: Timetable;

    @IsOptional()
    lecturer?: Lecturer;

    @IsOptional()
    lecturerL2?: Lecturer;

    @IsEnum(Object.values(Day))
    @IsOptional()
    day?: Day;

    @Matches(configuration().regex.dateOnly)
    @IsOptional()
    date?: string;

    @IsEnum(Object.values(Day))
    @IsOptional()
    dayL2?: Day;

    @Matches(configuration().regex.dateOnly)
    @IsOptional()
    dateL2?: string;

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
