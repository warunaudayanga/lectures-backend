import { IsNotEmpty, IsObject } from "class-validator";
import { UserErrors } from "../responses";
import { toErrString } from "../../../core/converters";
import { Role } from "../entities";

export class UpdateUserRoleDto {
    @IsObject(toErrString(UserErrors.USER_400_INVALID_ROLE))
    @IsNotEmpty(toErrString(UserErrors.USER_400_EMPTY_ROLE))
    role: Role;
}
