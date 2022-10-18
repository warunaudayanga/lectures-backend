const PollErrors = {
    POLL_400_EMPTY_NAME: {
        status: 400,
        code: "POLL_400_EMPTY_NAME",
        message: "Poll name cannot be empty!",
    },
    POLL_400_NOT_EMPTY_NAME: {
        status: 400,
        code: "POLL_400_EMPTY_NAME",
        message: "Poll name cannot be updated!",
    },
    POLL_400_EMPTY_OPTIONS: {
        status: 400,
        code: "POLL_400_EMPTY_OPTIONS",
        message: "Poll options cannot be empty!",
    },
    POLL_400_NOT_EMPTY_OPTIONS: {
        status: 400,
        code: "POLL_400_EMPTY_OPTIONS",
        message: "Poll options cannot be updated!",
    },
    POLL_400_INVALID_OPTIONS: {
        status: 400,
        code: "POLL_400_INVALID_OPTIONS",
        message: "Invalid value for poll options",
    },
    POLL_400_INVALID_CODE: {
        status: 400,
        code: "POLL_400_INVALID_CODE",
        message: "Invalid value for poll code",
    },
    POLL_409_EXIST_NAME: {
        status: 400,
        code: "POLL_409_EXIST_NAME",
        message: "Poll with given name already exist!",
    },
    POLL_409_EXIST_CODE: {
        status: 400,
        code: "POLL_409_EXIST_CODE",
        message: "Poll with given code already exist!",
    },
    POLL_VOTE_400_EMPTY_OPTION: {
        status: 400,
        code: "POLL_VOTE_400_EMPTY_OPTION",
        message: "Poll vote option cannot be empty!",
    },
    POLL_VOTE_400_INVALID_POLL_ID: {
        status: 400,
        code: "POLL_VOTE_400_INVALID_POLL_ID",
        message: "Invalid value for poll vote poll id",
    },
    POLL_VOTE_400_INVALID_OPTION: {
        status: 400,
        code: "POLL_VOTE_400_INVALID_OPTION",
        message: "Invalid value for poll vote option",
    },
    POLL_VOTE_400_POLL_CLOSED: {
        status: 400,
        code: "POLL_VOTE_400_POLL_CLOSED",
        message: "This pole has been closed",
    },
    POLL_VOTE_400_POLL_NOT_OPENED: {
        status: 400,
        code: "POLL_VOTE_400_POLL_NOT_OPENED",
        message: "This pole has not been opened yet",
    },
    POLL_VOTE_400_POLL_INACTIVE: {
        status: 400,
        code: "POLL_VOTE_400_POLL_INACTIVE",
        message: "This pole is not active",
    },
    POLL_VOTE_409_ALREADY_VOTED: {
        status: 409,
        code: "POLL_VOTE_409_ALREADY_VOTED",
        message: "User already voted",
    },
};

export { PollErrors };
