/* eslint-disable lines-between-class-members */
// noinspection JSUnusedGlobalSymbols

import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { IUser } from "src/modules/user/interfaces";
import { LoggerService } from "../../../services";
import { Event } from "../enums/events.enum";
import { DefaultRoles } from "../../../../modules/user/enums/default-roles.enum";
import { Events } from "../../webhook/enums/events.enum";
import { EventEmitter2 } from "@nestjs/event-emitter";

export interface Client {
    id: number;
    role: DefaultRoles | string;
    socket: Socket;
}

@Injectable()
export class SocketService {
    private clients: Client[] = [];

    constructor(private readonly eventEmitter: EventEmitter2) {}

    async getUserBySocket(socket: Socket): Promise<IUser> {
        const bearerToken = socket.handshake.auth?.token || socket.handshake.headers.authorization;
        if (!bearerToken) {
            return null;
        }
        return await this.getUserByToken(bearerToken);
    }

    // noinspection TypeScriptValidateTypes
    async getUserByToken(bearerToken): Promise<IUser> {
        const [user] = (await this.eventEmitter.emitAsync(Events.USER_GET_BY_TOKEN, bearerToken)) as [IUser];
        return user;
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

    getClientsSockets(ids: number[]): Socket[] {
        return this.clients.filter((c) => ids.includes(c.id))?.map((c) => c.socket);
    }

    removeClient(socket: Socket): void {
        this.clients = this.clients.filter((c) => c.socket.id !== socket.id);
        console.log(`Client disconnected: ${socket.id}`); // eslint-disable-line no-console
        console.log(`Clients: ${this.clients.length}`); // eslint-disable-line no-console
    }

    emit<T>(event: Event | string, data: T): void;
    emit<T>(event: Event | string, role: DefaultRoles | string, data: T): void;
    emit<T>(event: Event | string, dataOrRole: T | DefaultRoles, data?: T): void {
        try {
            const dt: T = data ?? (dataOrRole as T);
            const role: DefaultRoles | undefined = data ? (dataOrRole as DefaultRoles) : undefined;
            const clients = role ? this.clients.filter((c) => c.role === dataOrRole) : this.clients;
            clients.forEach((c) => {
                c.socket.emit(event, dt);
            });
        } catch (e) {
            LoggerService.error(e);
        }
    }

    emitUser<T>(event: Event | string, userId: number, data: T): void {
        this.clients.find((c) => c.id === userId)?.socket.emit(event, data);
    }
}
