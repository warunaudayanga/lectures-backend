import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    constructor() {}

    @Get("/health")
    health(): { status: "UP" } {
        return { status: "UP" };
    }
}
