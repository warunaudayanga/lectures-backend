import { IsEmpty, IsNotEmpty, IsOptional, Matches, ValidateIf } from "class-validator";
import { BaseDto } from "../../../core/entity";
import { toErrString } from "../../../core/converters";
import { PollErrors } from "../responses/poll.error.responses";
import { PollOptions } from "../interfaces/poll-option.interface";
import { IPollVote } from "../interfaces/poll-vote.interface";
import configuration from "../../../core/config/configuration";

export class CreatePollDto extends BaseDto {
    @IsNotEmpty(toErrString(PollErrors.POLL_400_EMPTY_NAME))
    name: string;

    @Matches(configuration().regex.pollCode, toErrString(PollErrors.POLL_400_INVALID_CODE))
    @ValidateIf((dto: CreatePollDto) => Boolean(dto.code))
    @IsOptional()
    code?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    startTime?: string;

    @IsOptional()
    endTime?: string;

    // @IsArray(toErrString(PollErrors.POLL_400_INVALID_OPTIONS))
    @IsNotEmpty(toErrString(PollErrors.POLL_400_EMPTY_OPTIONS))
    options: PollOptions;

    @IsOptional()
    updatable?: boolean;

    @IsOptional()
    removable?: boolean;

    @IsEmpty()
    votes: IPollVote[];
}
