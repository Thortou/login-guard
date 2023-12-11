import { Controller, Get } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { Permissions } from "src/common/decorators/permission.decorator";
import { Permission } from "../users/entities/permission.entity";

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ){}

    // @Permissions(Permission.READ_PROFILE)
    @Get()
    findAll(): Promise<any> {
        return this.profileService.findAll()
    }
}