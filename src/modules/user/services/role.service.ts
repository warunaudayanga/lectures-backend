import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../entities";
import { RoleRepository } from "../repositories";
import { EntityService } from "../../../core/entity";

@Injectable()
export class RoleService extends EntityService<Role> {
    constructor(@InjectRepository(RoleRepository) private userRepository: RoleRepository) {
        super(userRepository, "role", "name");
    }
}
