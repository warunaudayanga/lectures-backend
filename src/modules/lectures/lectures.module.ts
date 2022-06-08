import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
    CourseRepository,
    CourseModuleRepository,
    LecturerRepository,
    TimetableRepository,
    ScheduleRepository,
    SlotRepository,
} from "./repositories";
import {
    CourseService,
    CourseModuleService,
    LecturerService,
    TimetableService,
    ScheduleService,
    SlotService,
} from "./services";
import {
    CourseController,
    CourseModuleController,
    LecturerController,
    ScheduleController,
    SlotController,
    TimetableController,
} from "./controllers";
import { Course, CourseModule, Lecturer, Schedule, Slot, Timetable } from "./entities";

@Module({
    imports: [TypeOrmModule.forFeature([Course, CourseModule, Lecturer, Slot, Timetable, Schedule])],
    controllers: [
        CourseController,
        CourseModuleController,
        LecturerController,
        SlotController,
        TimetableController,
        ScheduleController,
    ],
    providers: [
        CourseService,
        CourseModuleService,
        LecturerService,
        SlotService,
        TimetableService,
        ScheduleService,
        CourseRepository,
        CourseModuleRepository,
        LecturerRepository,
        SlotRepository,
        TimetableRepository,
        ScheduleRepository,
    ],
    exports: [CourseService],
})
export class LecturesModule {}
