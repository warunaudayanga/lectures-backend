import { Day } from "../../../core/enums";
import { IsNotEmpty, IsOptional } from "class-validator";
import { CourseModule, Lecturer, Slot } from "../entities";

export class UpdateTimetableEntryDto {
    @IsNotEmpty()
    id: number;

    @IsOptional()
    slot?: Slot;

    @IsOptional()
    slotL2?: Slot;

    @IsOptional()
    day?: Day;

    @IsOptional()
    lecturer?: Lecturer;

    @IsOptional()
    lecturerL2?: Lecturer;

    @IsOptional()
    module?: CourseModule;

    @IsOptional()
    recordingsUrl?: string;

    @IsOptional()
    documentsUrl?: string;

    @IsOptional()
    recordingsUrlL2?: string;

    @IsOptional()
    documentsUrlL2?: string;
}
