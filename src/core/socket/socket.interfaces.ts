import { Socket } from "socket.io";

export interface Client {
    client: Socket;
    userId: number;
}
