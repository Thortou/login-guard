import { Injectable, Provider } from "@nestjs/common";
import { IRoleRepository } from "./role.repository";
import { RoleEntity, RoleModel } from "../entities/role.entity";
import { ROLE_KEY } from "./inject.keys";
import { InjectDataSource } from "@nestjs/typeorm";
import { Connection_DB } from "src/common/configuration/typeorm.config";
import { DataSource } from "typeorm";


@Injectable()
export class RoleRepository implements IRoleRepository {

    constructor(
        @InjectDataSource(Connection_DB.Main)
        private _dataSource : DataSource
    ){}
    create(input: RoleModel): Promise<RoleModel> {
        throw new Error("Method not implemented.");
    }
    getWithPermission(id: number): Promise<RoleModel> {
        throw new Error("Method not implemented.");
    }
    getWithUser(id: number): Promise<RoleModel> {
        throw new Error("Method not implemented.");
    }
    update(id: number, input: RoleModel): Promise<RoleModel> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<RoleModel> {
        throw new Error("Method not implemented.");
    }
    async getRoles(ids: number[]): Promise<RoleEntity[]> {
        const result = await this._dataSource
      .getRepository(RoleModel)
      .createQueryBuilder('roles')
      .where('roles.id IN (:...ids)', { ids })
      .getMany();

      return result
    }

}

export const RoleTypeOrmRepositoryProvider: Provider = {
    provide: ROLE_KEY,
    useClass: RoleRepository,
  };