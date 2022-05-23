import { toFirstCase } from "../functions";
import { IStatusResponse } from "./interfaces";

const EntityResponses = {
    CREATED: (entityName: string): IStatusResponse => {
        return {
            status: true,
            message: `${toFirstCase(entityName)} created successfully!`,
        };
    },
    UPDATE: (entityName: string): IStatusResponse => {
        return {
            status: true,
            message: `${toFirstCase(entityName)} updated successfully!`,
        };
    },
    SUCCESS: {
        status: true,
        message: "success",
    },
};

export { EntityResponses };
