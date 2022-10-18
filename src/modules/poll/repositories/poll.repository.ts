import { EntityRepository } from "typeorm";
import { BaseRepository } from "../../../core/entity";
import { Poll } from "../entities";

@EntityRepository(Poll)
export class PollRepository extends BaseRepository<Poll> {}
