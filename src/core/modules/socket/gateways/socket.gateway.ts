// noinspection JSUnusedLocalSymbols

import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../../guards";
import { SocketService } from "../services/socket.service";
import { Gateway } from "../../../enums/gateways.enum";

@WebSocketGateway({ namespace: Gateway.MAIN })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server: Server;

    constructor(private readonly socketService: SocketService) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    afterInit(server: Server): void {
        console.log("Server Initialized"); // eslint-disable-line no-console
    }

    @UseGuards(JwtAuthGuard)
    async handleConnection(client: Socket): Promise<any> {
        if (!(await this.socketService.addClient(client))) {
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket): any {
        this.socketService.removeClient(client);
    }

    // @SubscribeMessage(ChatEvent.MESSAGE)
    // async onMessage(@ConnectedSocket() client: Socket, @MessageBody() sendMessageDto: SendMessageDto): Promise<WsResponseWithTransmission<IMessage> | WsErrorWithTransmission> {
    //     try {
    //         const message = await this.chatService.send(client, sendMessageDto);
    //         return Ws.responseWithId(ChatEvent.MESSAGE_RESPONSE, message, sendMessageDto.transmitId);
    //     } catch (err: any) {
    //         LoggerService.error(err);
    //         return Ws.errorResponse(err, sendMessageDto.transmitId);
    //     }
    // }
    //
    // @SubscribeMessage(ChatEvent.EDIT)
    // async onEdit(@ConnectedSocket() client: Socket, @MessageBody() editMessageDto: EditMessageDto): Promise<WsResponseWithTransmission<IMessage> | WsErrorWithTransmission> {
    //     try {
    //         const updatedMessage = await this.chatService.editMessage(client, editMessageDto);
    //         return Ws.responseWithId(ChatEvent.EDIT_RESPONSE, updatedMessage, editMessageDto.transmitId);
    //     } catch (err: any) {
    //         LoggerService.error(err);
    //         return Ws.errorResponse(err, editMessageDto.transmitId);
    //     }
    // }
    //
    // @SubscribeMessage(ChatEvent.DELETE)
    // async onDelete(@ConnectedSocket() client: Socket, @MessageBody() deleteMessageDto: DeleteMessageDto): Promise<WsResponseWithTransmission<SuccessDto> | WsErrorWithTransmission> {
    //     try {
    //         await this.chatService.deleteMessage(client, deleteMessageDto);
    //         return Ws.responseWithId(ChatEvent.DELETE_RESPONSE, new SuccessDto(), deleteMessageDto.transmitId);
    //     } catch (err: any) {
    //         LoggerService.error(err);
    //         return Ws.errorResponse(err, deleteMessageDto.transmitId);
    //     }
    // }
    //
    // @SubscribeMessage(ChatEvent.SEEN)
    // async onSeen(@ConnectedSocket() client: Socket, @MessageBody() setSeenDto: SetSeenDto): Promise<WsResponseWithTransmission<SuccessDto> | WsErrorWithTransmission> {
    //     try {
    //         await this.chatService.setSeen(client, setSeenDto.room);
    //         return Ws.responseWithId(ChatEvent.SEEN_RESPONSE, new SuccessDto(), setSeenDto.transmitId);
    //     } catch (err: any) {
    //         LoggerService.error(err);
    //         return Ws.errorResponse(err, setSeenDto.transmitId);
    //     }
    // }
}
