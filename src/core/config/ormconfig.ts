import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
    type: (process.env.DATABASE_TYPE || "mysql") as "mysql" | "mariadb",
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "root",
    database: process.env.DATABASE_SCHEMA || "lectures",
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["./migrations/*{.ts,.js}"],
    cli: {
        migrationsDir: "./migrations",
    },
    synchronize: false,
    legacySpatialSupport: false,
    keepConnectionAlive: true,
    autoLoadEntities: true,
};
