import { IsBoolean, IsEnum, IsNotEmpty } from "class-validator";
import { ModuleErrors } from "../responses";
import { BaseDto } from "../../../core/entity";
import { toErrString } from "../../../core/converters";
import { Department } from "../enums";

export class CreateCourseModuleDto extends BaseDto {
    @IsNotEmpty(toErrString(ModuleErrors.MODULE_400_EMPTY_NAME))
    name: string;

    @IsEnum(Object.values(Department), toErrString(ModuleErrors.MODULE_400_INVALID_DEPT))
    @IsNotEmpty(toErrString(ModuleErrors.MODULE_400_EMPTY_DEPT))
    department: Department;

    @IsNotEmpty(toErrString(ModuleErrors.MODULE_400_EMPTY_SEM))
    semester: number;

    @IsNotEmpty(toErrString(ModuleErrors.MODULE_400_EMPTY_CREDITS))
    credits: number;

    @IsNotEmpty(toErrString(ModuleErrors.MODULE_400_EMPTY_SERIAL))
    serial: string;

    @IsBoolean(toErrString(ModuleErrors.MODULE_400_INVALID_REVISED))
    @IsNotEmpty(toErrString(ModuleErrors.MODULE_400_EMPTY_REVISED))
    revised: boolean;

    @IsBoolean()
    @IsNotEmpty()
    grouped: boolean;
}
