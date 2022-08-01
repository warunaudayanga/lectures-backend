import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { SocketService } from "./services/socket.service";
import { SocketGateway } from "./gateways/socket.gateway";

@Module({
    imports: [HttpModule],
    providers: [SocketService, SocketGateway],
    exports: [SocketService],
})
export class SocketModule {}
