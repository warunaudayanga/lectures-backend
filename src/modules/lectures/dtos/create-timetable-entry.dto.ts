import { ICourseModule, ILecturer } from "../interfaces";
import { Day } from "../../../core/enums";
import { ISlot } from "../interfaces/slot.interface";
import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { IUser } from "../../user/interfaces";

export class CreateTimetableEntryDto {
    @IsNotEmpty()
    slot: ISlot;

    @IsOptional()
    slotL2: ISlot;

    @IsNotEmpty()
    day: Day;

    @IsNotEmpty()
    lecturer: ILecturer;

    @IsOptional()
    lecturerL2: ILecturer;

    @IsNotEmpty()
    module: ICourseModule;

    @IsOptional()
    recordingsUrl?: string;

    @IsOptional()
    documentsUrl?: string;

    @IsOptional()
    recordingsUrlL2?: string;

    @IsOptional()
    documentsUrlL2?: string;

    @IsEmpty()
    createdBy: IUser;
}
