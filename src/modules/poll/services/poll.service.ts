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
import { SocketService } from "../../../core/modules/socket/services/socket.service";

@Injectable()
export class PollService extends EntityService<Poll> {
    constructor(
        @InjectRepository(PollRepository) private readonly pollRepository: PollRepository,
        protected readonly socketService: SocketService,
        private readonly pollResultService: PollVoteService,
    ) {
        super(socketService, pollRepository, "poll", "name");
    }

    async vote(pollVote: DeepPartial<PollVote>, createdBy: User): Promise<PollVote> {
        const poll = await this.get(pollVote.poll.id, { relations: ["users"] });
        const now = new Date().getTime();
        if (poll.startTime?.getTime() > now) {
            return Promise.reject(new BadRequestException(PollErrors.POLL_VOTE_400_POLL_NOT_OPENED));
        } else if (poll.endTime?.getTime() < now) {
            return Promise.reject(new BadRequestException(PollErrors.POLL_VOTE_400_POLL_CLOSED));
        } else if (poll.status !== Status.ACTIVE) {
            return Promise.reject(new BadRequestException(PollErrors.POLL_VOTE_400_POLL_INACTIVE));
        }

        const voteSelections = pollVote?.option?.selections?.map((s) => s.name);
        for (let i = 0; i < voteSelections.length; i++) {
            if (!poll.options?.selections?.map((s) => s.name).includes(voteSelections[i])) {
                return Promise.reject(new BadRequestException(PollErrors.POLL_VOTE_400_INVALID_OPTION));
            }
            for (let j = 0; j < pollVote?.option?.selections[i].values.length; j++) {
                if (
                    !poll.options?.selections
                        .find((s) => s.name === voteSelections[i])
                        .values.includes(pollVote?.option?.selections[i].values[j])
                ) {
                    return Promise.reject(new BadRequestException(PollErrors.POLL_VOTE_400_INVALID_OPTION));
                }
            }
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
