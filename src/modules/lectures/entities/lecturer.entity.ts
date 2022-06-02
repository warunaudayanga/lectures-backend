import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../core/entity";
import { ILecturer } from "../interfaces";
import { Title } from "../../../core/enums";

@Entity({ name: "lecturer" })
export class Lecturer extends BaseEntity implements ILecturer {
    @Column({ type: "enum", enum: Title, nullable: false })
    title: Title;

    @Column({ nullable: false })
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    mobile: string;

    @Column()
    profileImage: string;

    @Column({
        generatedType: "STORED",
        asExpression: "CONCAT(title, ' ', firstName, ' ', lastName)",
    })
    name: string;
}
