import { IsArray, IsEnum, IsOptional, Matches } from "class-validator";
import { CourseErrors } from "../responses";
import { BaseDto } from "../../../core/entity";
import { toErrString } from "../../../core/converters";
import configuration from "../../../core/config/configuration";
import { CourseType } from "../enums";
import { ICourseModule } from "../interfaces";

export class UpdateCourseDto extends BaseDto {
    @IsOptional()
    name?: string;

    @IsOptional()
    code?: string;

    @Matches(configuration().regex.year, toErrString(CourseErrors.COURSE_400_INVALID_YEAR))
    @IsOptional()
    year?: number;

    @IsEnum(Object.values(CourseType), toErrString(CourseErrors.COURSE_400_INVALID_TYPE))
    @IsOptional()
    type?: CourseType;

    @IsArray(toErrString(CourseErrors.COURSE_400_INVALID_MODULES))
    @IsOptional()
    modules?: ICourseModule[] | number[];
}
