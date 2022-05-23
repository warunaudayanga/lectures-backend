// noinspection JSUnusedGlobalSymbols

export const toFirstCase = (str: string): string => {
    return str[0].toUpperCase() + str.slice(1);
};

export const toNumber = (n: number | string): number => {
    return !isNaN(Number(n)) ? Number(n) : undefined;
};
