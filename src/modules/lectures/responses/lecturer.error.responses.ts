const LecturerErrors = {
    LECTURER_400_EMPTY_ID: {
        status: 400,
        code: "LECTURER_400_EMPTY_ID",
        message: "Lecturer id cannot be empty!",
    },
    LECTURER_400_EMPTY_IDS: {
        status: 400,
        code: "LECTURER_400_EMPTY_IDS",
        message: "Lecturer ids cannot be empty!",
    },
    LECTURER_400_EMPTY_FNAME: {
        status: 400,
        code: "LECTURER_400_EMPTY_FNAME",
        message: "Lecturer first name cannot be empty!",
    },
    LECTURER_400_EMPTY_TITLE: {
        status: 400,
        code: "LECTURER_400_EMPTY_TITLE",
        message: "Lecturer title cannot be empty!",
    },
    LECTURER_400_INVALID_IDS: {
        status: 400,
        code: "LECTURER_400_INVALID_IDS",
        message: "Invalid value for lecturer ids!",
    },
    LECTURER_400_INVALID_TITLE: {
        status: 400,
        code: "LECTURER_400_INVALID_TITLE",
        message: "Invalid value for lecturer title!",
    },
};

export { LecturerErrors };
