import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { RoleModel } from "../entities/role.entity";
import { PerrmissionModel } from "../entities/permission.entity";

export default class RoleSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<any> {
      const repository = dataSource.getRepository(RoleModel);
      const perimssion = await dataSource.getRepository(PerrmissionModel).find();
  
      const datas = [
        {
          id: 1,
          name: 'super-admin'
        },
        {
          id: 2,
          name: 'dev'
        },
        {
          id: 3,
          name: 'customer'
        },
        {
          id: 4,
          name: 'admin'
        },
      ];
  
      await repository.save(
        datas.map((data) => {
          const model = new RoleModel();
          model.id = data.id;
          model.name = data.name;
          if (data.id === 4) {
            model.permissions = perimssion;
          }
          return model;
        }),
      );
    }
  }