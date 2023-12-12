import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { PerrmissionModel } from "../entities/permission.entity";
import { permissionData } from "./permissions";

export default class PermissionSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<any> {
      const repository = dataSource.getRepository(PerrmissionModel);
  
      await repository.save(
        permissionData.map((data) => {
          const model = new PerrmissionModel();
          model.id = data.id;
          model.name = data.name;
          return model;
        }),
      );
    }
  }