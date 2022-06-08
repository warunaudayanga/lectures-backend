import { IsNotEmpty, IsObject } from "class-validator";
import { UserErrors } from "../responses";
import { IRole } from "../interfaces";
import { toErrString } from "../../../core/converters";

export class UpdateUserRoleDto {
    @IsObject(toErrString(UserErrors.USER_400_INVALID_ROLE))
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_ROLE))
    role: IRole;
}
