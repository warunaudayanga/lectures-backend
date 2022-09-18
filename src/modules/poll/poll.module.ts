import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Poll, PollVote } from "./entities";
import { PollRepository } from "./repositories/poll.repository";
import { PollVoteRepository } from "./repositories/poll-vote.repository";
import { PollController } from "./controllers/poll.controller";
import { PollService } from "./services";
import { PollVoteService } from "./services/poll-vote.service";

@Module({
    imports: [TypeOrmModule.forFeature([Poll, PollVote, PollRepository, PollVoteRepository])],
    controllers: [PollController],
    providers: [PollService, PollVoteService],
    exports: [],
})
export class PollModule {}
