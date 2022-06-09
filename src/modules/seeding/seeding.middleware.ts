import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { EntityManager } from "typeorm";
import { AuthService } from "../auth/services";
import { Permission, Status } from "../../core/enums";
import { DefaultRoles } from "../user/enums/default-roles.enum";
import { Role, User } from "../user/entities";
import { DeepPartial } from "typeorm/common/DeepPartial";

@Injectable()
export class SeedingMiddleware implements NestMiddleware {
    // to avoid round trips to db we store the info about whether
    // the seeding has been completed as boolean flag in the middleware
    // we use a promise to avoid concurrency cases. Concurrency cases may
    // occur if other requests also trigger a seeding while it has already
    // been started by the first request. The promise can be used by other
    // requests to wait for the seeding to finish.
    private isSeedingComplete: Promise<boolean>;

    constructor(private readonly entityManager: EntityManager) {}

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (await this.isSeedingComplete) {
            // seeding has already taken place,
            // we can short-circuit to the next middleware
            return next();
        }

        const rolesDto: DeepPartial<Role>[] = [
            {
                name: DefaultRoles.ADMIN,
                permissions: Object.values(Permission),
                status: Status.ACTIVE,
            },
            {
                name: DefaultRoles.REPRESENTATIVE,
                permissions: [Permission.TIMETABLE_VIEW, Permission.TIMETABLE_GET, Permission.SLOT_GET],
                status: Status.ACTIVE,
            },
            {
                name: DefaultRoles.STUDENT,
                permissions: [Permission.TIMETABLE_VIEW, Permission.TIMETABLE_GET, Permission.SLOT_GET],
                status: Status.ACTIVE,
            },
        ];

        const authData = AuthService.generatePassword("admin@123");

        const admin: DeepPartial<User> = {
            firstName: "Super",
            lastName: "Admin",
            username: "admin",
            studentId: 0,
            studentIdString: "",
            phoneVerified: false,
            emailVerified: false,
            studentIdVerified: false,
            // course: null,
            salt: authData.salt,
            password: authData.password,
            status: Status.ACTIVE,
        };

        this.isSeedingComplete = (async (): Promise<boolean> => {
            // for example, you start with an initial seeding entry called 'initial-seeding'
            // on 2019-06-27. if 'initial-seeding' already exists in db, then this
            // part is skipped
            if (!(await this.entityManager.findOne(User, { username: "admin" }))) {
                await this.entityManager.transaction(async (transactionalEntityManager) => {
                    const roles: Role[] = await transactionalEntityManager.save(Role, rolesDto);
                    await transactionalEntityManager.save(User, { ...admin, role: roles[0] });
                    // persist in db that 'initial-seeding' is complete
                    // await transactionalEntityManager.save(new Auth());
                });
            }

            // now a month later on 2019-07-25 you add another seeding
            // entry called 'another-seeding-round' since you want to initialize
            // entities that you just created a month later
            // since 'initial-seeding' already exists it is skipped but 'another-seeding-round'
            // will be executed now.
            // if (!await this.entityManager.findOne(Auth, { email: "admin@market.com", nic: "00000000V" })) {
            //     await this.entityManager.transaction(async transactionalEntityManager => {
            //         await transactionalEntityManager.save(Auth, admin);
            //         // persist in db that 'initial-seeding' is complete
            //         // await transactionalEntityManager.save(new Auth());
            //     });
            // }

            return true;
        })();

        await this.isSeedingComplete;

        next();
    }
}
