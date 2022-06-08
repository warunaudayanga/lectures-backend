// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import { ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { AuthErrors } from "../../modules/auth/responses";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleRequest(err, user, info): any {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new HttpException(AuthErrors.AUTH_401_NOT_LOGGED_IN, HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}
