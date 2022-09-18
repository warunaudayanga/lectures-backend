export type PollOptionValue = string | number | boolean;

export interface PollOptions {
    options: PollOptionValue[];
    themeClass: string;
}

export interface PollOption {
    option: PollOptionValue;
}
