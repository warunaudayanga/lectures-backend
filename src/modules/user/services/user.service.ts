import { Injectable } from "@nestjs/common";
import { User } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../repositories";
import { EntityService } from "../../../core/entity";

@Injectable()
export class UserService extends EntityService<User> {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
        super(userRepository, "user", "username");
    }
}
