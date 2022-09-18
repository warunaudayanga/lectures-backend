import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityService } from "../../../core/entity";
import { PollVote } from "../entities";
import { PollVoteRepository } from "../repositories/poll-vote.repository";

@Injectable()
export class PollVoteService extends EntityService<PollVote> {
    constructor(@InjectRepository(PollVoteRepository) private pollResultRepository: PollVoteRepository) {
        super(pollResultRepository, "poll_vote", "user vote");
    }
}
