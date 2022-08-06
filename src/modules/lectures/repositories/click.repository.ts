import { EntityRepository } from "typeorm";
import { Click } from "../entities";
import { BaseRepository } from "../../../core/entity";

@EntityRepository(Click)
export class ClickRepository extends BaseRepository<Click> {}
