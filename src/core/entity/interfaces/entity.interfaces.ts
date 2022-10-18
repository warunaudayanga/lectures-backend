import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";
import { Status } from "../../enums";
import { IUser } from "../../../modules/user/interfaces";

export interface IQueryError {
    query: string;
    parameters: string[];
    driverError: {
        code: string;
        errno: number;
        sqlState: string;
        sqlMessage: string;
        sql: string;
    };
    code: string;
    errno: number;
    sqlState: string;
    sqlMessage: string;
    sql: string;
}

export type ISort<Entity> = { [P in EntityFieldsNames<Entity>]: "ASC" | "DESC" };

export interface IPagination {
    skip?: number;
    take?: number;
}

export interface IQueryOptions<Entity> extends IPagination {
    filter?: {
        keyword: string;
        fields: (keyof Entity)[];
    };
    order?: ISort<Entity>;
}

export interface IBaseEntity {
    id: number;
    status: Status | string;
    createdAt: Date;
    createdBy?: IUser;
    updatedAt?: Date;
    updatedBy?: IUser;
    deletedAt?: Date;
    deletedBy?: IUser;
}
