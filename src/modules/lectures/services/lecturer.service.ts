import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Lecturer } from "../entities";
import { LecturerRepository } from "../repositories";
import { EntityService } from "../../../core/entity";
import { SocketService } from "../../../core/modules/socket/services/socket.service";

@Injectable()
export class LecturerService extends EntityService<Lecturer> {
    constructor(
        @InjectRepository(LecturerRepository) private lecturerRepository: LecturerRepository,
        protected readonly socketService: SocketService,
    ) {
        super(socketService, lecturerRepository, "lecturer");
    }
}
