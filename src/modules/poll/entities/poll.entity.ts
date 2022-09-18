import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import { IPoll } from "../interfaces";
import { PollOptions } from "../interfaces/poll-option.interface";
import { Status } from "../../../core/enums";
import { User } from "../../user/entities";
import { PollVote } from "./poll-vote.entity";

@Unique("NAME", ["name"])
@Unique("CODE", ["code"])
@Entity({ name: "polls" })
export class Poll implements IPoll {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    endTime: Date;

    @Column({ nullable: true })
    startTime: Date;

    @Column({ type: "json" })
    options: PollOptions;

    @Column({ default: false })
    requireIdentity: boolean;

    @Column({ default: false })
    removable: boolean;

    @Column({ default: false })
    updatable: boolean;

    @OneToMany(() => PollVote, (result) => result.poll)
    votes: PollVote[];

    @ManyToMany(() => User, (user) => user.votedPolls)
    @JoinTable({
        name: "poll_voters",
        joinColumn: { name: "userId" },
        inverseJoinColumn: { name: "pollId" },
    })
    users?: User[];

    @Column({ type: "enum", enum: Status, default: Status.INACTIVE })
    status: Status | string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User)
    createdBy?: User;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    updatedBy?: User;

    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToOne(() => User)
    deletedBy?: User;
}
