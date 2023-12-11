import { RoleModel } from "../entities/role.entity";

export interface IRoleRepository {
    create(input: RoleModel): Promise<RoleModel>;
  
    getWithPermission(id: number): Promise<RoleModel>;
  
    getWithUser(id: number): Promise<RoleModel>;
  
    update(id: number, input: RoleModel): Promise<RoleModel>;
  
    delete(id: number): Promise<RoleModel>;
  
    getRoles(ids: number[]): Promise<RoleModel[]>;

}