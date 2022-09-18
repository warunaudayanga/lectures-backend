import { IBaseEntity } from "../../../core/entity";
import { IPoll } from "./poll.interface";
import { PollOption } from "./poll-option.interface";

export interface IPollVote extends IBaseEntity {
    option: PollOption;
    poll: IPoll;
}
