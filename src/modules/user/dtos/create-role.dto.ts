import { IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { RoleErrors } from "../responses";
import { Permission } from "../../../core/enums";
import { BaseDto } from "../../../core/entity";
import { toErrString } from "../../../core/converters";

export class CreateRoleDto extends BaseDto {
    @IsNotEmpty(toErrString(RoleErrors.ROLE_400_EMPTY_NAME))
    name: string;

    @IsArray(toErrString(RoleErrors.ROLE_400_INVALID_PERMISSIONS))
    @IsOptional()
    permissions?: Permission[];
}
