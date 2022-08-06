import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
    CourseRepository,
    CourseModuleRepository,
    LecturerRepository,
    TimetableRepository,
    ScheduleRepository,
    SlotRepository,
    ClickRepository,
} from "./repositories";
import {
    CourseService,
    CourseModuleService,
    LecturerService,
    TimetableService,
    ScheduleService,
    SlotService,
    ClickService,
} from "./services";
import {
    ClickController,
    CourseController,
    CourseModuleController,
    LecturerController,
    ScheduleController,
    SlotController,
    TimetableController,
} from "./controllers";
import { Course, CourseModule, Lecturer, Schedule, Slot, Timetable, Click } from "./entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Course,
            CourseModule,
            Lecturer,
            Slot,
            Timetable,
            Schedule,
            Click,
            CourseRepository,
            CourseModuleRepository,
            LecturerRepository,
            SlotRepository,
            TimetableRepository,
            ScheduleRepository,
            ClickRepository,
        ]),
    ],
    controllers: [
        CourseController,
        CourseModuleController,
        LecturerController,
        SlotController,
        TimetableController,
        ScheduleController,
        ClickController,
    ],
    providers: [
        CourseService,
        CourseModuleService,
        LecturerService,
        SlotService,
        TimetableService,
        ScheduleService,
        ClickService,
    ],
    exports: [CourseService],
})
export class LecturesModule {}
