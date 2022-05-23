import { Global, Module } from "@nestjs/common";
import { CommonController } from "./common.controller";
import { LoggerService } from "../../core/services";

@Global()
@Module({
    controllers: [CommonController],
    providers: [LoggerService],
})
export class CommonModule {}
