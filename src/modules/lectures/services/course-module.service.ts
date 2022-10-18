import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseModule } from "../entities";
import { CourseModuleRepository } from "../repositories";
import { EntityService } from "../../../core/entity";
import { SocketService } from "../../../core/modules/socket/services/socket.service";

@Injectable()
export class CourseModuleService extends EntityService<CourseModule> {
    constructor(
        @InjectRepository(CourseModuleRepository) private moduleRepository: CourseModuleRepository,
        protected readonly socketService: SocketService,
    ) {
        super(socketService, moduleRepository, "module", "code");
    }
}
