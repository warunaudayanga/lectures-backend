import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityService } from "../../../core/entity";
import { PollVote } from "../entities";
import { PollVoteRepository } from "../repositories/poll-vote.repository";
import { SocketService } from "../../../core/modules/socket/services/socket.service";

@Injectable()
export class PollVoteService extends EntityService<PollVote> {
    constructor(
        @InjectRepository(PollVoteRepository) private pollResultRepository: PollVoteRepository,
        protected readonly socketService: SocketService,
    ) {
        super(socketService, pollResultRepository, "poll_vote", "user vote");
    }
}
