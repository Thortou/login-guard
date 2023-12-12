import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { UserModel } from '../entities/user.entity';
import { ProfileModel } from '../../../modules/profiles/entities/profile.entity';
import { RoleModel } from '../entities/role.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const usersRepository = dataSource.getRepository(UserModel);
    const profileRepository = dataSource.getRepository(ProfileModel);
    const user = new UserModel();
    user.id = 1;
    user.username = 'admin';
    user.gmail = 'adminTest@gmail.com';
    user.password = await hash('11111111', 10);
    user.roles = [
      await dataSource.getRepository(RoleModel).findOneBy({ id: 4 }),
    ];
    const user1 = new UserModel();
    user1.id = 2;
    user1.username = 'user';
    user1.gmail = 'user@gmail.com';
    user1.password = await hash('11111111', 10);
    const newUser = await usersRepository.save([user, user1]);

    const profile = new ProfileModel();
    profile.id = 1;
    profile.user_id = newUser[0].id;
    profile.first_name = 'admin_test';
    profile.last_name = 'dev';
    profile.gender = 'm';
    await profileRepository.save(profile);

    const userFactory = factoryManager.get(UserModel);
    const profileFactory = factoryManager.get(ProfileModel);

    const count = await profileRepository.manager.count(ProfileModel);

    if (count < 10) {
      const profiles = await profileFactory.saveMany(10);
      const newProfiles = await profileRepository.save(profiles);

      const users = await Promise.all(
        newProfiles.map(async (profile) => {
          return await userFactory.make({
            username: faker.internet.userName(),
            gmail: faker.internet.email(),
            tel: null,
            profile,
          });
        }),
      );

      await usersRepository.save(users);
    }

    const userCount = await usersRepository.count();

    if (userCount < 20) {
      const customers = await userFactory.saveMany(10);

      await usersRepository.save(customers);
    }
  }
}
