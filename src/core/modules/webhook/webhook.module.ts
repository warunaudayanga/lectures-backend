import { Global, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { WebhookService } from "./services/webhook.service";

@Global()
@Module({
    imports: [HttpModule],
    providers: [WebhookService],
    exports: [WebhookService],
})
export class WebhookModule {}
