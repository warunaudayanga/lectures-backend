import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Click } from "../entities";
import { ClickRepository } from "../repositories";
import { EntityService } from "../../../core/entity";

@Injectable()
export class ClickService extends EntityService<Click> {
    constructor(@InjectRepository(ClickRepository) private clickRepository: ClickRepository) {
        super(clickRepository, "click");
    }
}
