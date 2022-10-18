import { IsEmpty } from "class-validator";
import { IBaseEntity } from "./interfaces";
import { Status } from "../enums";
import { User } from "../../modules/user/entities";
import { CommonErrors } from "../responses";
import { toErrString } from "../converters";

export class BaseDto implements IBaseEntity {
    @IsEmpty()
    id: number;

    @IsEmpty(toErrString(CommonErrors.E_400_NOT_EMPTY_STATUS))
    status: Status;

    @IsEmpty()
    createdAt: Date;

    @IsEmpty()
    createdBy?: User;

    @IsEmpty()
    updatedAt: Date;

    @IsEmpty()
    updatedBy?: User;

    @IsEmpty()
    deletedAt?: Date;

    @IsEmpty()
    deletedBy?: User;
}
