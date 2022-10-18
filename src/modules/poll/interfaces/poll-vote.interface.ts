import { IBaseEntity } from "../../../core/entity";
import { IPoll } from "./poll.interface";
import { VoteOptions } from "./poll-option.interface";

export interface IPollVote extends IBaseEntity {
    option: VoteOptions;
    poll: IPoll;
}
