import { IUser } from "./user.interface";
import { Permission } from "../../../core/enums";
import { IBaseEntity } from "../../../core/entity";

export interface IRole extends IBaseEntity {
    name: string;
    permissions?: Permission[];
    users?: IUser[];
}
