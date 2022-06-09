import { Day } from "../../../core/enums";
import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { CourseModule, Lecturer, Slot } from "../entities";
import { User } from "../../user/entities";

export class CreateTimetableEntryDto {
    @IsNotEmpty()
    slot: Slot;

    @IsOptional()
    slotL2: Slot;

    @IsNotEmpty()
    day: Day;

    @IsNotEmpty()
    lecturer: Lecturer;

    @IsOptional()
    lecturerL2: Lecturer;

    @IsNotEmpty()
    module: CourseModule;

    @IsOptional()
    recordingsUrl?: string;

    @IsOptional()
    documentsUrl?: string;

    @IsOptional()
    recordingsUrlL2?: string;

    @IsOptional()
    documentsUrlL2?: string;

    @IsEmpty()
    createdBy: User;
}
