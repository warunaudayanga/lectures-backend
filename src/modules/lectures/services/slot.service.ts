import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Slot } from "../entities";
import { EntityService } from "../../../core/entity";
import { SlotRepository } from "../repositories";

@Injectable()
export class SlotService extends EntityService<Slot> {
    constructor(@InjectRepository(SlotRepository) private slotRepository: SlotRepository) {
        super(slotRepository, "slot", "number");
    }
}
