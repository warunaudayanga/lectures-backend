import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseRepository, CourseModuleRepository } from "./repositories";
import { CourseService, CourseModuleService } from "./services";
import { CourseController, CourseModuleController } from "./controllers";
import { Course, CourseModule } from "./entities";

@Module({
    imports: [TypeOrmModule.forFeature([Course, CourseModule, CourseRepository, CourseModuleRepository])],
    controllers: [CourseController, CourseModuleController],
    providers: [CourseService, CourseModuleService],
    exports: [],
})
export class LecturesModule {}
