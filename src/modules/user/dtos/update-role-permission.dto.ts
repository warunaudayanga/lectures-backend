import { IsArray, IsNotEmpty } from "class-validator";
import { RoleErrors } from "../responses";
import { Permission } from "../../../core/enums";
import { toErrString } from "../../../core/converters";

export class UpdateRolePermissionDto {
    @IsArray(toErrString(RoleErrors.ROLE_400_INVALID_PERMISSIONS))
    @IsNotEmpty(toErrString(RoleErrors.ROLE_400_EMPTY_PERMISSIONS))
    permissions: Permission[];
}
