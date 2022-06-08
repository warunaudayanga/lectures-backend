import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import { AllExceptionsFilter } from "./core/filters";
import { LoggerService } from "./core/services";

// eslint-disable-next-line func-style,@typescript-eslint/explicit-function-return-type
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: new LoggerService() });
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    app.use(cookieParser());
    // app.use(helmet());
    app.enableCors();
    // app.setViewEngine("");
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.setGlobalPrefix("api");
    await app.listen(3000);
}
// noinspection JSIgnoredPromiseFromCall
bootstrap();
