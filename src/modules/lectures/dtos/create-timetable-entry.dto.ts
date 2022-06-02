import { ICourseModule, ILecturer } from "../interfaces";
import { Day } from "../../../core/enums";
import { ISlot } from "../interfaces/slot.interface";
import { IsEmpty, IsNotEmpty } from "class-validator";
import { IUser } from "../../user/interfaces";

export class CreateTimetableEntryDto {
    @IsNotEmpty()
    slot: ISlot;

    @IsNotEmpty()
    day: Day;

    @IsNotEmpty()
    lecturer: ILecturer;

    @IsNotEmpty()
    module: ICourseModule;

    @IsEmpty()
    createdBy: IUser;
}
