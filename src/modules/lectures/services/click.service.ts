import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Click } from "../entities";
import { ClickRepository } from "../repositories";
import { EntityService } from "../../../core/entity";
import { SocketService } from "../../../core/modules/socket/services/socket.service";

@Injectable()
export class ClickService extends EntityService<Click> {
    constructor(
        @InjectRepository(ClickRepository) private clickRepository: ClickRepository,
        protected readonly socketService: SocketService,
    ) {
        super(socketService, clickRepository, "click");
    }
}
