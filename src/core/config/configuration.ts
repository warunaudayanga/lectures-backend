import * as dotenv from "dotenv";

dotenv.config({
    path: "../../../.env",
});

export const relations = ["createdBy", "updatedBy", "deletedBy"];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => ({
    database: {
        type: process.env.DATABASE_TYPE || "mysql",
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        schema: process.env.DATABASE_SCHEMA,
        port: parseInt(process.env.DATABASE_PORT) || 3306,
        charset: "utf8mb4",
        synchronize: process.env.DATABASE_SYNC === "true",
        baseRelations: relations,
    },
    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
        ttl: process.env.REDIS_CACHE_TTL,
        uri: `redis://${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT || 6379}`,
    },
    logs: {
        fileName: process.env.LOG_FILE || "errors",
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT) || 465,
        secure: true,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    pushover: {
        url: process.env.PUSHOVER_URL,
        user: process.env.PUSHOVER_USER,
        token: process.env.PUSHOVER_TOKEN,
        errorToken: process.env.PUSHOVER_ERROR_TOKEN,
    },
    onesignal: {
        appId: process.env.ONESIGNAL_APP_ID,
        restApiKey: process.env.ONESIGNAL_API_KEY,
    },
    regex: {
        year: new RegExp(/^[1-9]\d{3,}$/),
        time: new RegExp(/^([0-1]?\d|2[0-3])(?::([0-5]?\d))?(?::([0-5]?\d))?$/),
        dateOnly: new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/),
    },
});
