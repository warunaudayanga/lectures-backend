import { EntityRepository } from "typeorm";
import { Slot } from "../entities";
import { BaseRepository } from "../../../core/entity";

@EntityRepository(Slot)
export class SlotRepository extends BaseRepository<Slot> {}
