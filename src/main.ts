import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

// eslint-disable-next-line func-style
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
// noinspection JSIgnoredPromiseFromCall
bootstrap();
