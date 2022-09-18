import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { IPoll } from "../interfaces";
import { PollOption } from "../interfaces/poll-option.interface";
import { Status } from "../../../core/enums";
import { User } from "../../user/entities";
import { IPollVote } from "../interfaces/poll-vote.interface";
import { Poll } from "./poll.entity";

@Entity({ name: "poll_vote" })
export class PollVote implements IPollVote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "json", nullable: false })
    option: PollOption;

    @ManyToOne(() => Poll, (poll) => poll.votes, { nullable: false })
    poll: IPoll;

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
