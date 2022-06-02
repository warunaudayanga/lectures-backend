import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Lecturer } from "../entities";
import { LecturerRepository } from "../repositories";
import { EntityService } from "../../../core/entity";

@Injectable()
export class LecturerService extends EntityService<Lecturer> {
    constructor(@InjectRepository(LecturerRepository) private lecturerRepository: LecturerRepository) {
        super(lecturerRepository, "lecturer");
    }
}
