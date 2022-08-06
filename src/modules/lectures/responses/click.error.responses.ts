const ClickErrors = {
    CLICK_400_EMPTY_TYPE: {
        status: 400,
        code: "CLICK_400_EMPTY_TYPE",
        message: "Click type cannot be empty!",
    },
    CLICK_400_EMPTY_BUTTON: {
        status: 400,
        code: "CLICK_400_EMPTY_BUTTON",
        message: "Click button cannot be empty!",
    },
    CLICK_400_INVALID_TYPE: {
        status: 400,
        code: "CLICK_400_INVALID_TYPE",
        message: "Invalid value for click type",
    },
    CLICK_400_INVALID_BUTTON: {
        status: 400,
        code: "CLICK_400_INVALID_BUTTON",
        message: "Invalid value for click button!",
    },
};

export { ClickErrors };
