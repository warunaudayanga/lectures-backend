import { IsEnum, IsNotEmpty, IsOptional, Matches } from "class-validator";
import configuration from "../../../core/config/configuration";
import { DateOnly, Time } from "../../../core/interfaces";
import { Timetable } from "../entities";
import { Day } from "../../../core/enums";
import { ILecturer } from "../interfaces";

export class CreateScheduleDto {
    @IsOptional()
    entry?: Timetable;

    @IsOptional()
    lecturer?: ILecturer;

    @IsOptional()
    lecturerL2?: ILecturer;

    @IsEnum(Object.values(Day))
    @IsNotEmpty()
    day: Day;

    @Matches(configuration().regex.dateOnly)
    @IsNotEmpty()
    date: DateOnly;

    @IsEnum(Object.values(Day))
    @IsOptional()
    dayL2?: Day;

    @Matches(configuration().regex.dateOnly)
    @IsOptional()
    dateL2?: DateOnly;

    @IsOptional()
    slot: number;

    @IsNotEmpty()
    startAt: Time;

    @IsNotEmpty()
    endAt: Time;

    @IsOptional()
    slotL2?: number;

    @IsOptional()
    startAtL2?: Time;

    @IsOptional()
    endAtL2?: Time;

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
