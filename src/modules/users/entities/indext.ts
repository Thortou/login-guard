import { ProfileModel } from "../../../modules/profiles/entities/profile.entity";
import { PerrmissionModel } from "./permission.entity";
import { RoleModel } from "./role.entity";
import { UserModel } from "./user.entity";

export const userModel = [
    UserModel,
    RoleModel,
    PerrmissionModel,
    ProfileModel

]