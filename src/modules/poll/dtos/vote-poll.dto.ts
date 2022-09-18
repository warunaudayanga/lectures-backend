import { IsEmpty, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { BaseDto } from "../../../core/entity";
import { toErrString } from "../../../core/converters";
import { PollErrors } from "../responses/poll.error.responses";
import { PollOption } from "../interfaces/poll-option.interface";
import { IPoll } from "../interfaces";

export class VotePollDto extends BaseDto {
    @IsNotEmpty(toErrString(PollErrors.POLL_VOTE_400_EMPTY_OPTION))
    option: PollOption;

    @IsNumber(undefined, toErrString(PollErrors.POLL_VOTE_400_INVALID_POLL_ID))
    @IsNotEmpty()
    pollId: number;

    @IsOptional()
    anonymous?: boolean;

    @IsEmpty()
    poll: Partial<IPoll>;
}
