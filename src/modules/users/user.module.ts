import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userModel } from "./entities/indext";
import { Connection_DB } from "src/common/configuration/typeorm.config";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthService } from "./auth/auth.service";
import { APP_GUARD } from "@nestjs/core";
import { PermissionGuard } from "src/common/guards/permission.guard";
import { ROLE_KEY } from "./roles/inject.keys";
import { RoleRepository } from "./roles/role.repo";
// import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { strategies } from "./auth";

@Module({
    imports: [
        TypeOrmModule.forFeature(userModel, Connection_DB.Main),

    ],
    controllers: [UserController],
    providers: [

        //  LocalStrategy, JwtStrategy,
        {
            provide: ROLE_KEY,
            useClass: RoleRepository
        }, 
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtAuthGuard, 
        // },
        {
            provide: APP_GUARD,
            useClass: PermissionGuard,
        },

        UserService, AuthService,
        ...strategies 
    ]
})
export class UserModule { }