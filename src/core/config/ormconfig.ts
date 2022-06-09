import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import configuration from "./configuration";

export const config: TypeOrmModuleOptions = {
    type: configuration().database.type as "mysql" | "mariadb",
    host: configuration().database.host,
    port: configuration().database.port,
    username: configuration().database.user,
    password: configuration().database.password,
    database: configuration().database.schema,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["database/migrations/*{.ts,.js}"],
    cli: {
        migrationsDir: "database/migrations",
    },
    synchronize: false,
    legacySpatialSupport: false,
    keepConnectionAlive: true,
    autoLoadEntities: true,
};
