import { IsOptional, Matches } from "class-validator";
import { BaseDto } from "../../../core/entity";
import configuration from "../../../core/config/configuration";
import { Time } from "../../../core/interfaces";

export class UpdateSlotDto extends BaseDto {
    @IsOptional()
    number?: number;

    @Matches(configuration().regex.time)
    @IsOptional()
    startAt?: Time;

    @Matches(configuration().regex.time)
    @IsOptional()
    endAt?: Time;
}
