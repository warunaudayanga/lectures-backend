import { IsEmpty, IsNotEmpty, IsObject, IsOptional } from "class-validator";
import { UserErrors } from "../responses";
import { toErrString } from "../../../core/converters";
import { Course } from "../../lectures/entities";

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
    course?: Course;

    @IsEmpty()
    name?: string;
}
