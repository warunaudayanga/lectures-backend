import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller()
export class AppController {
    @Get(["", "health", "status"])
    @HttpCode(200)
    health(): {
        status: string;
        message: string;
        version: string;
    } {
        return {
            status: "ok",
            message: "API is running",
            version: "1.0.0",
        };
    }
}
