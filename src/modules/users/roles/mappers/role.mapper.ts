import { ProfileEntity, ProfileModel } from "src/modules/profiles/entities/profile.entity";
import { CreateUserDto } from "../../dtos/user.dto";
import { UserEntity, UserModel } from "../../entities/user.entity";
import { IMapperDto } from "./mapper";
import { RoleEntity, RoleModel } from "../../entities/role.entity";

export class CreateUserDtoMapper
    implements IMapperDto<UserEntity, CreateUserDto>
{
    toEntity(dto: CreateUserDto): UserEntity {
        const entity = new UserEntity();
        entity.username = dto.username;
        entity.gmail = dto.gmail;
        entity.tel = dto.tel;
        entity.password = dto.password;
        const profiles = new ProfileEntity()
        profiles.first_name = dto.first_name;
        profiles.last_name = dto.last_name;
        profiles.gender = dto.gender;
        profiles.dob = dto.dob;
        entity.profile = profiles;
        entity.roles = dto.role_id.map((roleId) => {
            const roleModel = new RoleEntity();
            roleModel.id = roleId
            return roleModel
        })
        return entity;
    }
}