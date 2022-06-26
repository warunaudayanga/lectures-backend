import { Injectable } from "@nestjs/common";
import { OneSignalService } from "onesignal-api-client-nest";

@Injectable()
export class PushNotificationService {
    constructor(private readonly oneSignalService: OneSignalService) {}
}
