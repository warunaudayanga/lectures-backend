import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../entities";
import { RoleRepository } from "../repositories";
import { EntityService } from "../../../core/entity";
import { SocketService } from "../../../core/modules/socket/services/socket.service";

@Injectable()
export class RoleService extends EntityService<Role> {
    constructor(
        @InjectRepository(RoleRepository) private readonly userRepository: RoleRepository,
        protected readonly socketService: SocketService,
    ) {
        super(socketService, userRepository, "role", "name");
    }
}
