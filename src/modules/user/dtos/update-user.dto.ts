import { IsEmpty, IsObject, IsOptional } from "class-validator";
import { UserErrors } from "../responses";
import { ICourse } from "../../lectures/interfaces";
import { toErrString } from "../../../core/converters";

export class UpdateUserDto {
    @IsOptional()
    firstName?: string;

    @IsOptional()
    lastName?: string;

    @IsEmpty(toErrString(UserErrors.USER_400_EMPTY_PASSWORD))
    salt: string;

    @IsOptional()
    profileImage?: string;

    @IsObject(toErrString(UserErrors.USER_400_INVALID_COURSE))
    @IsOptional()
    course?: ICourse;
}
