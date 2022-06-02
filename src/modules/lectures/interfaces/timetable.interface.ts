import { ICourse } from "./course.interface";
import { ICourseModule } from "./course-module.interface";
import { ILecturer } from "./lecturer.interface";
import { Day } from "../../../core/enums";
import { ISlot } from "./slot.interface";

export interface ITimetable {
    course: ICourse;
    module: ICourseModule;
    lecturer: ILecturer;
    day: Day;
    slot: ISlot;
}
