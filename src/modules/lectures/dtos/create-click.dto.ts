import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { BaseDto } from "../../../core/entity";
import { toErrString } from "../../../core/converters";
import { ButtonType, ClickType } from "../enums";
import { Schedule, Timetable } from "../entities";
import { ClickErrors } from "../responses/click.error.responses";

export class CreateClickDto extends BaseDto {
    @IsEnum(Object.values(ClickType), toErrString(ClickErrors.CLICK_400_INVALID_TYPE))
    @IsNotEmpty(toErrString(ClickErrors.CLICK_400_EMPTY_TYPE))
    type: ClickType;

    @IsEnum(Object.values(ButtonType), toErrString(ClickErrors.CLICK_400_INVALID_BUTTON))
    @IsNotEmpty(toErrString(ClickErrors.CLICK_400_EMPTY_BUTTON))
    button: ButtonType;

    @IsOptional()
    schedule?: Schedule;

    @IsOptional()
    timetable?: Timetable;
}
