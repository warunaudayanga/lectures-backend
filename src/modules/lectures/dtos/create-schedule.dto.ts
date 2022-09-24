import { IsEnum, IsNotEmpty, IsOptional, Matches } from "class-validator";
import configuration from "../../../core/config/configuration";
import { Lecturer, Timetable } from "../entities";
import { Day } from "../../../core/enums";

export class CreateScheduleDto {
    @IsOptional()
    entry?: Timetable;

    @IsOptional()
    lecturer?: Lecturer;

    @IsOptional()
    lecturerL2?: Lecturer;

    @IsEnum(Object.values(Day))
    @IsNotEmpty()
    day: Day;

    @Matches(configuration().regex.dateOnly)
    @IsNotEmpty()
    date: string;

    @IsEnum(Object.values(Day))
    @IsOptional()
    dayL2?: Day;

    @Matches(configuration().regex.dateOnly)
    @IsOptional()
    dateL2?: string;

    @IsOptional()
    slot: number;

    @IsNotEmpty()
    startAt: string;

    @IsNotEmpty()
    endAt: string;

    @IsOptional()
    slotL2?: number;

    @IsOptional()
    startAtL2?: string;

    @IsOptional()
    endAtL2?: string;

    @IsOptional()
    meetingId?: string;

    @IsOptional()
    passcode?: string;

    @IsOptional()
    meetingUrl?: string;

    @IsOptional()
    recordingUrl?: string;

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
