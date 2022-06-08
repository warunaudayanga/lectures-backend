import { IsEmpty } from "class-validator";
import { IBaseEntity } from "./interfaces";
import { Status } from "../enums";
import { User } from "../../modules/user/entities";

export class BaseDto implements IBaseEntity {
    @IsEmpty()
    id: number;

    @IsEmpty()
    status: Status;

    @IsEmpty()
    createdAt: Date;

    @IsEmpty()
    createdBy: User;

    @IsEmpty()
    updatedAt: Date;

    @IsEmpty()
    updatedBy?: User;

    @IsEmpty()
    deletedAt?: Date;

    @IsEmpty()
    deletedBy?: User;
}
