export type PollOptionValue = string;

export interface VoteSelection {
    name?: string;
    values?: PollOptionValue[];
}

export interface PollSelection extends VoteSelection {
    label?: string;
    multiple?: boolean;
}

export interface PollOptions {
    selections?: PollSelection[];
    themeClass?: string;
}

export interface VoteOptions {
    selections?: VoteSelection[];
}
