import { User } from "../entities";
import { EntityRepository } from "typeorm";
import { BaseRepository } from "../../../core/entity";

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
