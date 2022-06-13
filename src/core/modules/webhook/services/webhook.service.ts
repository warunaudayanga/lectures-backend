// noinspection HtmlDeprecatedTag,XmlDeprecatedElement,HtmlDeprecatedAttribute

import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { OnEvent } from "@nestjs/event-emitter";
import { PushoverPayload, PushoverRequestDto } from "../../../interfaces";
import configuration from "../../../config/configuration";
import { User } from "../../../../modules/user/entities";
import { Events } from "../enums/events.enum";
import * as moment from "moment";

@Injectable()
export class WebhookService {
    constructor(private readonly http: HttpService) {}

    sendMessage(payload: PushoverPayload): void {
        const requestDto: PushoverRequestDto = {
            user: configuration().pushover.user,
            token: configuration().pushover.token,
            html: 1,
            ...payload,
        };
        this.http.post(configuration().pushover.url, requestDto).subscribe();
    }

    @OnEvent(Events.USER_REGISTERED)
    onUserRegistered(user: User): void {
        const title = "Alert";
        let message = "";
        const createdAt = moment(user.createdAt).format("YYYY-MM-DD / hh:mm:ss a");
        if (user.createdBy) {
            message = String(message);
        }
        message += `
            <font color='#ff8c00'><b>A new user has been ${user.createdAt ? "created" : "registered"}!</b></font><br>
            <font color='#ff0000'><b>* </b></font><font color='green'><b>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </font><font color='white'><b>${
                user.name
            }</b></font>
           <font color='#ff0000'><b>* </b></font><font color='green'><b>Course&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </font><font color='white'><b>${
               user.course.name + " [" + user.course.code + "]"
           }</b></font>
            <font color='#ff0000'><b>* </b></font><font color='green'><b>Student ID&nbsp;&nbsp;: </font><font color='white'><b>${
                user.studentIdString
            }</b></font>
            <font color='#ff0000'><b>* </b></font><font color='green'><b>On&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </font><font color='white'><b>${createdAt}</b></font><br>`;
        const payload: PushoverPayload = { title, message };
        this.sendMessage(payload);
    }
}
