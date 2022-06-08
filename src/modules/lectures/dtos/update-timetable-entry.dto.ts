import { ICourseModule, ILecturer } from "../interfaces";
import { Day } from "../../../core/enums";
import { ISlot } from "../interfaces/slot.interface";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateTimetableEntryDto {
    @IsNotEmpty()
    id: number;

    @IsOptional()
    slot?: ISlot;

    @IsOptional()
    slotL2?: ISlot;

    @IsOptional()
    day?: Day;

    @IsOptional()
    lecturer?: ILecturer;

    @IsOptional()
    lecturerL2?: ILecturer;

    @IsOptional()
    module?: ICourseModule;

    @IsOptional()
    recordingsUrl?: string;

    @IsOptional()
    documentsUrl?: string;

    @IsOptional()
    recordingsUrlL2?: string;

    @IsOptional()
    documentsUrlL2?: string;
}
