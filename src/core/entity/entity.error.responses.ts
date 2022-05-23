import { toFirstCase } from "../functions";
import { EntityErrorResponse } from "./interfaces";

const EntityErrors = {
    E_400_NO_DEFAULT: (entityName: string, field: string): EntityErrorResponse => ({
        status: 409,
        code: `${entityName.toUpperCase()}_400_EMPTY_${field.toUpperCase()}`,
        message: `${toFirstCase(entityName)} ${field.toLowerCase()} cannot be empty!`,
    }),
    E_404_ID: (entityName: string): EntityErrorResponse => ({
        status: 404,
        code: `${entityName.toUpperCase()}_404_ID`,
        message: `Cannot find a ${entityName.toLowerCase()} with given id!`,
    }),
    E_404_CONDITION: (entityName: string): EntityErrorResponse => ({
        status: 404,
        code: `${entityName.toUpperCase()}_404_CONDITION`,
        message: `Cannot find a ${entityName.toLowerCase()} with given condition!`,
    }),
    E_409_EXIST_U: (entityName: string, unique: string): EntityErrorResponse => ({
        status: 409,
        code: `${entityName.toUpperCase()}_409_EXIST_${unique.toUpperCase()}`,
        message: `${toFirstCase(entityName)} with given ${unique.toLowerCase()} already exist!`,
    }),
    E_500: {
        status: 500,
        code: "E_500",
        message: "Unexpected error occurred!",
    },
};

export { EntityErrors };
