import { Socket } from "socket.io";

// noinspection JSUnusedGlobalSymbols
export interface Client {
    client: Socket;
    userId: number;
}
