const CourseErrors = {
    COURSE_400_EMPTY_ID: {
        status: 400,
        code: "COURSE_400_EMPTY_ID",
        message: "Course id cannot be empty!",
    },
    COURSE_400_EMPTY_IDS: {
        status: 400,
        code: "COURSE_400_EMPTY_IDS",
        message: "Course ids cannot be empty!",
    },
    COURSE_400_EMPTY_NAME: {
        status: 400,
        code: "COURSE_400_EMPTY_NAME",
        message: "Course name cannot be empty!",
    },
    COURSE_400_EMPTY_CODE: {
        status: 400,
        code: "COURSE_400_EMPTY_CODE",
        message: "Course code cannot be empty!",
    },
    COURSE_400_EMPTY_YEAR: {
        status: 400,
        code: "COURSE_400_EMPTY_YEAR",
        message: "Course year cannot be empty!",
    },
    COURSE_400_EMPTY_TYPE: {
        status: 400,
        code: "COURSE_400_EMPTY_TYPE",
        message: "Course type cannot be empty!",
    },
    COURSE_400_EMPTY_MODULES: {
        status: 400,
        code: "COURSE_400_EMPTY_MODULES",
        message: "Course modules cannot be empty!",
    },
    COURSE_400_INVALID_IDS: {
        status: 400,
        code: "COURSE_400_INVALID_IDS",
        message: "Invalid value for course ids!",
    },
    COURSE_400_INVALID_MODULES: {
        status: 400,
        code: "COURSE_400_INVALID_MODULES",
        message: "Invalid value for course modules!",
    },
    COURSE_400_INVALID_YEAR: {
        status: 400,
        code: "COURSE_400_INVALID_YEAR",
        message: "Invalid value for course year!",
    },
    COURSE_400_INVALID_TYPE: {
        status: 400,
        code: "COURSE_400_INVALID_TYPE",
        message: "Invalid value for course type!",
    },
    COURSE_409_EXIST_CODE: {
        status: 409,
        code: "COURSE_409_EXIST_CODE",
        message: "Course with given code exist!",
    },
};

export { CourseErrors };
