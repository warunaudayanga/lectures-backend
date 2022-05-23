import { IsArray, IsEnum, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { ICourseModule } from "../interfaces";
import { CourseErrors } from "../responses";
import { BaseDto } from "../../../core/entity";
import { toErrString } from "../../../core/converters";
import configuration from "../../../core/config/configuration";
import { CourseType } from "../enums";

export class CreateCourseDto extends BaseDto {
    @IsNotEmpty(toErrString(CourseErrors.COURSE_400_EMPTY_NAME))
    name: string;

    @IsNotEmpty(toErrString(CourseErrors.COURSE_400_EMPTY_CODE))
    code: string;

    @Matches(configuration().regex.year, toErrString(CourseErrors.COURSE_400_INVALID_YEAR))
    @IsNotEmpty(toErrString(CourseErrors.COURSE_400_EMPTY_YEAR))
    year: number;

    @IsEnum(Object.values(CourseType), toErrString(CourseErrors.COURSE_400_INVALID_TYPE))
    @IsNotEmpty(toErrString(CourseErrors.COURSE_400_EMPTY_TYPE))
    type: CourseType;

    @IsArray(toErrString(CourseErrors.COURSE_400_INVALID_MODULES))
    @IsOptional()
    modules?: ICourseModule[] | number[];
}
