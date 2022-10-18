import { Global, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { SocketService } from "./services/socket.service";
import { SocketGateway } from "./gateways/socket.gateway";

@Global()
@Module({
    imports: [HttpModule],
    providers: [SocketGateway, SocketService],
    exports: [SocketService],
})
export class SocketModule {}
