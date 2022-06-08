import { IsEmpty, IsNotEmpty, IsObject, IsOptional } from "class-validator";
import { UserErrors } from "../responses";
import { ICourse } from "../../lectures/interfaces";
import { toErrString } from "../../../core/converters";

export class CreateUserDto {
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_FIRST_NAME))
    firstName: string;

    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_LAST_NAME))
    lastName: string;

    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_USERNAME))
    username: string;

    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_PASSWORD))
    password: string;

    @IsEmpty(toErrString(UserErrors.USER_400_EMPTY_PASSWORD))
    salt?: string;

    @IsOptional()
    profileImage?: string;

    @IsObject(toErrString(UserErrors.USER_400_INVALID_COURSE))
    @IsOptional()
    course?: ICourse;
}
