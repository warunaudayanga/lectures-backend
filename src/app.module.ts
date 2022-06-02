import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "./modules/common";
import configuration from "./core/config/configuration";
import { AuthModule } from "./modules/auth/auth.module";
import { LecturesModule } from "./modules/lectures/lectures.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports: [
        ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
        CommonModule,
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot({
            type: configuration().database.type as any,
            host: configuration().database.host,
            port: configuration().database.port,
            username: configuration().database.user,
            password: configuration().database.password,
            database: configuration().database.schema,
            charset: configuration().database.charset,
            entities: ["dist/**/*.entity{.ts,.js}"],
            synchronize: true,
            migrations: ["./migrations/*{.ts,.js}"],
            cli: { migrationsDir: "./migrations" },
            extra: { charset: configuration().database.charset },
            legacySpatialSupport: false,
            keepConnectionAlive: true,
            autoLoadEntities: true,
        }),
        AuthModule,
        LecturesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
