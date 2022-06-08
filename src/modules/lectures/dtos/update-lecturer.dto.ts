import { IsEnum, IsOptional } from "class-validator";
import { BaseDto } from "../../../core/entity";
import { toErrString } from "../../../core/converters";
import { LecturerErrors } from "../responses";
import { Title } from "../../../core/enums";

export class UpdateLecturerDto extends BaseDto {
    @IsEnum(Object.values(Title), toErrString(LecturerErrors.LECTURER_400_INVALID_TITLE))
    @IsOptional()
    title?: Title;

    @IsOptional()
    firstName?: string;

    @IsOptional()
    lastName?: string;

    @IsOptional()
    email?: string;

    @IsOptional()
    mobile?: string;

    @IsOptional()
    profileImage?: string;
}
