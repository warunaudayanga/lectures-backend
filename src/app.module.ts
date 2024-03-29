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
import { SeedingModule } from "./modules/seeding/seeding.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { WebhookModule } from "./core/modules";
import { PollModule } from "./modules/poll/poll.module";
import { SocketModule } from "./core/modules/socket/socket.module";

@Module({
    imports: [
        ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
        CommonModule,
        EventEmitterModule.forRoot(),
        WebhookModule,
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot({
            type: configuration().database.type as "mysql" | "mariadb",
            host: configuration().database.host,
            port: configuration().database.port,
            username: configuration().database.user,
            password: configuration().database.password,
            database: configuration().database.schema,
            charset: configuration().database.charset,
            entities: ["dist/**/*.entity{.ts,.js}"],
            synchronize: false,
            migrations: ["src/migrations/*{.ts,.js}"],
            cli: { migrationsDir: "src/migrations" },
            extra: { charset: configuration().database.charset },
            legacySpatialSupport: false,
            keepConnectionAlive: true,
            autoLoadEntities: true,
        }),
        SeedingModule,
        AuthModule,
        SocketModule,
        LecturesModule,
        PollModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
