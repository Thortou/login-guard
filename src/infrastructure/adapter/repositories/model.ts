import { UserModel } from "src/modules/users/entities/user.entity";
import { userModel } from "../../../modules/users/entities/indext";
import { RoleModel } from "src/modules/users/entities/role.entity";
import { PerrmissionModel } from "src/modules/users/entities/permission.entity";

export const models = [
    ...userModel

    // UserModel,
    // RoleModel,
    // PerrmissionModel
]