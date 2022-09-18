import { IBaseEntity } from "../../../core/entity";
import { PollOptions } from "./poll-option.interface";
import { IPollVote } from "./poll-vote.interface";
import { IUser } from "../../user/interfaces";

export interface IPoll extends IBaseEntity {
    name: string;
    code: string;
    description?: string;
    startTime?: Date;
    endTime?: Date;
    options: PollOptions;
    votes: IPollVote[];
    requireIdentity: boolean;
    updatable: boolean;
    removable: boolean;
    users?: IUser[];
}
