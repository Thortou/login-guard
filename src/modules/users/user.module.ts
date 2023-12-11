import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userModel } from "./entities/indext";
import { Connection_DB } from "src/common/configuration/typeorm.config";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthService } from "./auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "src/common/configuration/jwt.config";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { PermissionGuard } from "src/common/guards/permission.guard";
import { ROLE_KEY } from "./roles/inject.keys";
import { RoleRepository } from "./roles/role.repo";

@Module({
    imports: [
        TypeOrmModule.forFeature(userModel, Connection_DB.Main),
        JwtModule.registerAsync({
            global: true,
            useFactory: jwtConfig,
            inject: [ConfigService],
        }),
    ],
    controllers: [UserController],
    providers: [
        {
            provide: ROLE_KEY,
            useClass: RoleRepository
        },
        {
            provide: APP_GUARD,
            useClass: PermissionGuard,
        },

        UserService, AuthService]
})
export class UserModule { }