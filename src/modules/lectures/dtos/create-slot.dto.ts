import { IsNotEmpty, Matches } from "class-validator";
import { BaseDto } from "../../../core/entity";
import configuration from "../../../core/config/configuration";
import { Time } from "../../../core/interfaces";

export class CreateSlotDto extends BaseDto {
    @IsNotEmpty()
    number: number;

    @Matches(configuration().regex.time)
    @IsNotEmpty()
    startAt: Time;

    @Matches(configuration().regex.time)
    @IsNotEmpty()
    endAt: Time;
}
