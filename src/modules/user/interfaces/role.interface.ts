import { IUser } from "./user.interface";
import { Permission } from "../../../core/enums";
import { IBaseEntity } from "../../../core/entity";

export interface IRole extends IBaseEntity {
    name: string;
    priority: number;
    permissions?: Permission[];
    users?: IUser[];
}
