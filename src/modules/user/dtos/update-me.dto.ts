import { IsEmpty, IsObject, IsOptional } from "class-validator";
import { UserErrors } from "../responses";
import { toErrString } from "../../../core/converters";
import { Course } from "../../lectures/entities";

export class UpdateMeDto {
    @IsOptional()
    firstName?: string;

    @IsOptional()
    lastName?: string;

    @IsOptional()
    username?: string;

    @IsOptional()
    profileImage?: string;

    @IsObject(toErrString(UserErrors.USER_400_INVALID_COURSE))
    @IsOptional()
    course?: Course;

    @IsEmpty()
    password?: string;

    @IsEmpty(toErrString(UserErrors.USER_400_EMPTY_PASSWORD))
    salt: string;

    @IsEmpty()
    name?: string;
}
