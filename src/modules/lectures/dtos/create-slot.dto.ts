import { IsNotEmpty, Matches } from "class-validator";
import { BaseDto } from "../../../core/entity";
import configuration from "../../../core/config/configuration";

export class CreateSlotDto extends BaseDto {
    @IsNotEmpty()
    number: number;

    @Matches(configuration().regex.time)
    @IsNotEmpty()
    startAt: string;

    @Matches(configuration().regex.time)
    @IsNotEmpty()
    endAt: string;
}
