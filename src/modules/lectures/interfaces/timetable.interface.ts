import { ICourse } from "./course.interface";
import { ICourseModule } from "./course-module.interface";
import { ILecturer } from "./lecturer.interface";
import { Day } from "../../../core/enums";
import { ISlot } from "./slot.interface";
import { IBaseEntity } from "../../../core/entity";

export interface ITimetable extends IBaseEntity {
    course: ICourse;
    module: ICourseModule;
    lecturer?: ILecturer;
    lecturerL2?: ILecturer;
    day: Day;
    slot: ISlot;
    slotL2?: ISlot;
    recordingsUrl?: string;
    documentsUrl?: string;
    recordingsUrlL2?: string;
    documentsUrlL2?: string;
}
