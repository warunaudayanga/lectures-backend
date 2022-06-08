import { IsBoolean, IsEnum, IsOptional } from "class-validator";
import { ModuleErrors } from "../responses";
import { BaseDto } from "../../../core/entity";
import { toErrString } from "../../../core/converters";
import { Department } from "../enums";

export class UpdateCourseModuleDto extends BaseDto {
    @IsOptional()
    name?: string;

    @IsEnum(Object.values(Department), toErrString(ModuleErrors.MODULE_400_INVALID_DEPT))
    @IsOptional()
    department?: Department;

    @IsOptional()
    semester?: number;

    @IsOptional()
    credits?: number;

    @IsOptional()
    serial?: string;

    @IsBoolean(toErrString(ModuleErrors.MODULE_400_INVALID_REVISED))
    @IsOptional()
    revised?: boolean;

    @IsBoolean()
    @IsOptional()
    grouped?: boolean;
}
