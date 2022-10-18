import { IsEmpty, IsOptional, Matches, ValidateIf } from "class-validator";
import { BaseDto } from "../../../core/entity";
import { toErrString } from "../../../core/converters";
import { PollErrors } from "../responses/poll.error.responses";
import { PollOptions } from "../interfaces/poll-option.interface";
import { IPollVote } from "../interfaces/poll-vote.interface";
import configuration from "../../../core/config/configuration";
import { IPoll } from "../interfaces";

export class UpdatePollDto extends BaseDto {
    @IsEmpty(toErrString(PollErrors.POLL_400_NOT_EMPTY_NAME))
    name?: string;

    @Matches(configuration().regex.pollCode, toErrString(PollErrors.POLL_400_INVALID_CODE))
    @IsOptional()
    code?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    startTime?: string;

    @IsOptional()
    endTime?: string;

    @ValidateIf((poll: IPoll) => Boolean(poll.options?.selections), toErrString(PollErrors.POLL_400_NOT_EMPTY_OPTIONS))
    options?: PollOptions;

    @IsOptional()
    updatable?: boolean;

    @IsOptional()
    removable?: boolean;

    @IsEmpty()
    votes?: IPollVote[];
}
