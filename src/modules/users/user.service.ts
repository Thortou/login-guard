import { InjectDataSource } from "@nestjs/typeorm";
import { UserModel } from "./entities/user.entity";
import { Connection_DB } from "src/common/configuration/typeorm.config";
import { DataSource } from "typeorm";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dtos/user.dto";
import * as bcript from 'bcrypt';
import { ProfileModel } from "../profiles/entities/profile.entity";
import { RoleModel } from "./entities/role.entity";
import { IRoleRepository } from "./roles/role.repository";
import { ROLE_KEY } from "./roles/inject.keys";
import { CreateUserDtoMapper } from "./roles/mappers/role.mapper";

@Injectable()
export class UserService {
    private _userMapper = new CreateUserDtoMapper()
    constructor(
        @InjectDataSource(Connection_DB.Main)
        private readonly _dataSource: DataSource,
        @Inject(ROLE_KEY)
        private _roleRepository: IRoleRepository,

    ) { }

    async create(userDto: CreateUserDto): Promise<any> {
        const entity = this._userMapper.toEntity(userDto)
        entity.password = await bcript.hash(userDto.password, 10)
        entity.roles = await this._roleRepository.getRoles(entity.roles.map((role) => role.id));

        const insert = await this._dataSource.getRepository(UserModel).save(entity)
        if (insert.profile) {
            insert.profile.user_id = insert.id;
            await this._dataSource.getRepository(ProfileModel).save(insert.profile);
        }
        return { status: 200, message: 'created...', data: insert }
    }

    async findAll(): Promise<UserModel[]> {
        const result = this._dataSource.getRepository(UserModel)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.roles', 'roles')
            .leftJoinAndSelect('roles.permissions', 'permissions')
            .getMany()
        return result
    }

    async findOne(id: number): Promise<UserModel> {
        const result = this._dataSource.getRepository(UserModel)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.roles', 'roles')
            .leftJoinAndSelect('roles.permissions', 'permissions')
            .where('users.id = :id', { id })
            .getOne()
            
        return result
    }

    async sigIn(username: string): Promise<UserModel | undefined> {
        const user = this._dataSource.getRepository(UserModel)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.roles', 'roles')
            .leftJoinAndSelect('roles.permissions', 'permissions')
            .where('users.username = :username', { username })
            .getOne()

            

        if (!user) throw new NotFoundException('user not found')

        return user
    }
}