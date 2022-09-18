import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityService } from "../../../core/entity";
import { Poll, PollVote } from "../entities";
import { PollRepository } from "../repositories/poll.repository";
import { PollVoteService } from "./poll-vote.service";
import { DeepPartial } from "typeorm/common/DeepPartial";
import { PollErrors } from "../responses/poll.error.responses";
import { User } from "../../user/entities";
import { Status } from "../../../core/enums";

@Injectable()
export class PollService extends EntityService<Poll> {
    constructor(
        @InjectRepository(PollRepository) private pollRepository: PollRepository,
        private pollResultService: PollVoteService,
    ) {
        super(pollRepository, "poll", "name");
    }

    async vote(pollVote: DeepPartial<PollVote>, createdBy: User): Promise<PollVote> {
        const poll = await this.get(pollVote.poll.id, { relations: ["users"] });
        const now = new Date().getTime();
        if (poll.startTime.getTime() > now) {
            return Promise.reject(new BadRequestException(PollErrors.POLL_VOTE_400_POLL_NOT_OPENED));
        } else if (poll.endTime.getTime() < now) {
            return Promise.reject(new BadRequestException(PollErrors.POLL_VOTE_400_POLL_CLOSED));
        } else if (poll.status !== Status.ACTIVE) {
            return Promise.reject(new BadRequestException(PollErrors.POLL_VOTE_400_POLL_INACTIVE));
        }
        if (!poll.options.options.includes(pollVote.option.option)) {
            return Promise.reject(new BadRequestException(PollErrors.POLL_VOTE_400_INVALID_OPTION));
        }
        if (poll.users.find((u) => u.id === createdBy.id)) {
            return Promise.reject(new ConflictException(PollErrors.POLL_VOTE_409_ALREADY_VOTED));
        }
        if (poll.users) {
            poll.users.push(createdBy);
        } else {
            poll.users = [createdBy];
        }
        await this.pollRepository.save(poll);
        return this.pollResultService.create(pollVote, undefined, ["poll"]);
    }
}
