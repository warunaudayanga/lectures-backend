import { IsOptional, Matches } from "class-validator";
import { BaseDto } from "../../../core/entity";
import configuration from "../../../core/config/configuration";

export class UpdateSlotDto extends BaseDto {
    @IsOptional()
    number?: number;

    @Matches(configuration().regex.time)
    @IsOptional()
    startAt?: string;

    @Matches(configuration().regex.time)
    @IsOptional()
    endAt?: string;
}
