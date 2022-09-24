import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Slot } from "../entities";
import { EntityService } from "../../../core/entity";
import { SlotRepository } from "../repositories";
import { SocketService } from "../../../core/modules/socket/services/socket.service";

@Injectable()
export class SlotService extends EntityService<Slot> {
    constructor(
        @InjectRepository(SlotRepository) private readonly slotRepository: SlotRepository,
        protected readonly socketService: SocketService,
    ) {
        super(socketService, slotRepository, "slot", "number");
    }
}
