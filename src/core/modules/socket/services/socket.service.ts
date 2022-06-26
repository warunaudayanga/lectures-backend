/* eslint-disable lines-between-class-members */
import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { IUser } from "src/modules/user/interfaces";
import { AuthService } from "../../../../modules/auth/services";
import { LoggerService } from "../../../services";
import { Event } from "../enums/events.enum";
import { DefaultRoles } from "../../../../modules/user/enums/default-roles.enum";

export interface Client {
    id: number;
    role: DefaultRoles | string;
    socket: Socket;
}

@Injectable()
export class SocketService {
    private clients: Client[] = [];

    constructor(private readonly authService: AuthService) {}

    async getUserBySocket(socket: Socket): Promise<IUser> {
        const bearerToken = socket.handshake.auth?.token || socket.handshake.headers.authorization;
        if (!bearerToken) {
            return null;
        }
        return await this.authService.getUserByToken(bearerToken);
    }

    async addClient(socket: Socket): Promise<boolean> {
        try {
            const { id, role } = await this.getUserBySocket(socket);
            if (!id) {
                return false;
            }
            const client = this.clients.find((c) => c.id === id);
            if (client) {
                this.clients[this.clients.indexOf(client)] = { socket, id, role: role.name };
            } else {
                this.clients.push({ socket, id, role: role.name });
            }
            console.log(`Client connected: { socketId: ${socket.id}, userId: ${id} }`); // eslint-disable-line no-console
            console.log(`Clients: ${this.clients.length}`); // eslint-disable-line no-console
            return true;
        } catch (e) {
            LoggerService.error(e);
        }
    }

    getClientSocket(id: number): Socket {
        return this.clients.find((c) => c.id !== id)?.socket;
    }

    getClientSockets(ids: number[]): Socket[] {
        return this.clients.filter((c) => ids.includes(c.id))?.map((c) => c.socket);
    }

    removeClient(socket: Socket): void {
        this.clients = this.clients.filter((c) => c.socket.id !== socket.id);
        console.log(`Client disconnected: ${socket.id}`); // eslint-disable-line no-console
        console.log(`Clients: ${this.clients.length}`); // eslint-disable-line no-console
    }

    emit<T>(event: Event | string, data: T): void;
    emit<T>(event: Event | string, role: DefaultRoles | string, data: T): void;
    emit<T>(event: Event | string, dataOrRole: T | DefaultRoles | string, data?: T): void {
        if (data) {
            this.clients
                .filter((c) => c.role === dataOrRole)
                .forEach((c) => {
                    c.socket.emit(event, data);
                });
        } else {
            this.clients.forEach((c) => {
                c.socket.emit(event, dataOrRole);
            });
        }
    }
}
