import { toJSON, toString } from "./json.converter";
import { EntityErrorResponse } from "../entity";
import { toFirstCase } from "../functions";

export const toErrString = (errObj: EntityErrorResponse): { message: string } => {
    return {
        message: toString(errObj),
    };
};

export const toErrorObject = (str: string): EntityErrorResponse => {
    return toJSON(str) as EntityErrorResponse;
};

export const applyTemplate = (str: string, prefix: string): string => {
    return str
        .replace("#{upperCase}", prefix.toUpperCase())
        .replace("#{lowerCase}", prefix.toLowerCase())
        .replace("#{firstCase}", toFirstCase(prefix));
};
