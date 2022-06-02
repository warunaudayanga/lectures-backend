import { EntityRepository } from "typeorm";
import { Lecturer } from "../entities";
import { BaseRepository } from "../../../core/entity";

@EntityRepository(Lecturer)
export class LecturerRepository extends BaseRepository<Lecturer> {}
