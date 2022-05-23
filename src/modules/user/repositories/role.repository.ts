import { EntityRepository } from "typeorm";
import { Role } from "../entities";
import { BaseRepository } from "../../../core/entity";

@EntityRepository(Role)
export class RoleRepository extends BaseRepository<Role> {}
