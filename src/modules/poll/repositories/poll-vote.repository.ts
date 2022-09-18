import { EntityRepository } from "typeorm";
import { BaseRepository } from "../../../core/entity";
import { PollVote } from "../entities";

@EntityRepository(PollVote)
export class PollVoteRepository extends BaseRepository<PollVote> {}
