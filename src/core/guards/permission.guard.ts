import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators";
import { User } from "../../modules/user/entities";
import { AuthErrors } from "../../modules/auth/responses";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<any[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPermissions) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest() as { user: User };
        if (requiredPermissions.some((permission) => user.role?.permissions.includes(permission))) {
            return true;
        }
        throw new HttpException(AuthErrors.AUTH_403_ROLE_FORBIDDEN, HttpStatus.FORBIDDEN);
    }
}
