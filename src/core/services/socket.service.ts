// import { Socket } from "socket.io";
// import { FindManyOptions } from "typeorm";
// import { Injectable } from "@nestjs/common";
// import { Client } from "../socket/socket.socket";
// import { AuthService } from "../../modules/auth/services/auth.service";
//
// @Injectable()
// export class SocketService {
//     private clients: Client[] = [];
//
//     constructor(private authService: AuthService) {}
//
//     addSocketClient(client: Socket, userId: number): void {
//         const existingClient = this.clients.find((c) => c.userId === userId);
//         if (existingClient) {
//             this.clients[this.clients.indexOf(existingClient)] = { client, userId };
//         } else {
//             this.clients.push({ client, userId });
//         }
//         console.log(`Client connected: { id: ${client.id}, userId: ${userId} }`); // eslint-disable-line no-console
//         console.log(`Clients: ${this.clients.length}`); // eslint-disable-line no-console
//     }
//
//     // noinspection JSUnusedGlobalSymbols
//     async getSocketClients(options?: FindManyOptions): Promise<Socket[]> {
//         const response = await this.authService.getAll(undefined, options);
//         const userIds: number[] = response.entities.map((a) => a.id);
//         return this.clients.filter((c) => userIds.includes(c.userId)).map((c) => c.client);
//     }
//
//     // noinspection JSUnusedGlobalSymbols
//     getSocketClient(userId: number): Socket {
//         return this.clients.find((c) => c.userId === userId)?.client;
//     }
//
//     removeSocketClient(client: Socket): void {
//         this.clients = this.clients.filter((c) => c.client.id !== client.id);
//         console.log(`Client disconnected: ${client.id}`); // eslint-disable-line no-console
//         console.log(`Clients: ${this.clients.length}`); // eslint-disable-line no-console
//     }
//
//     emit<T>(event: string, data: T): void {
//         this.clients.forEach((client) => {
//             client.client.emit(event, data);
//         });
//     }
//
//     // async getUserByToken(client: Socket): Promise<Auth> {
//     //     const bearerToken = client.handshake.auth?.token || client.handshake.headers.authorization;
//     //     if (bearerToken) {
//     //         return await this.authService.getUserByToken(bearerToken);
//     //     }
//     //     return null;
//     // }
// }
