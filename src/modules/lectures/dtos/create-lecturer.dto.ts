import { IsEmpty, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { BaseDto } from "../../../core/entity";
import { toErrString } from "../../../core/converters";
import { LecturerErrors } from "../responses";
import { Title } from "../../../core/enums";

export class CreateLecturerDto extends BaseDto {
    @IsEnum(Object.values(Title), toErrString(LecturerErrors.LECTURER_400_INVALID_TITLE))
    @IsNotEmpty(toErrString(LecturerErrors.LECTURER_400_EMPTY_TITLE))
    title: Title;

    @IsNotEmpty(toErrString(LecturerErrors.LECTURER_400_EMPTY_FNAME))
    firstName: string;

    @IsOptional()
    lastName?: string;

    @IsOptional()
    email?: string;

    @IsOptional()
    mobile?: string;

    @IsOptional()
    profileImage?: string;

    @IsEmpty()
    name?: string;
}
