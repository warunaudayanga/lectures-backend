import { IBaseEntity } from "../../../core/entity";
import { DateOnly, Time } from "../../../core/interfaces";
import { ITimetable } from "./timetable.interface";
import { Day } from "../../../core/enums";
import { ILecturer } from "./lecturer.interface";
import { ICourseModule } from "./course-module.interface";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISchedule extends IBaseEntity {
    entry: ITimetable;
    module: ICourseModule;
    lecturer?: ILecturer;
    lecturerL2?: ILecturer;
    day: Day;
    dayL2: Day;
    date: DateOnly;
    dateL2: DateOnly;
    slot: number;
    startAt: Time;
    endAt: Time;
    slotL2?: number;
    startAtL2?: Time;
    endAtL2?: Time;
    meetingId?: string;
    passcode?: string;
    meetingUrl?: string;
    recordingUrl?: string;
    documentsUrl?: string;
    meetingIdL2?: string;
    passcodeL2?: string;
    meetingUrlL2?: string;
    recordingUrlL2?: string;
    documentsUrlL2?: string;
}
