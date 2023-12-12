import { Faker } from '@faker-js/faker';
import { ProfileModel } from '../../../../modules/profiles/entities/profile.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ProfilesFactory = setSeederFactory(
  ProfileModel,
  async (faker: Faker) => {
    const profile = new ProfileModel();
    profile.first_name = faker.person.firstName();
    profile.last_name = faker.person.lastName();
    return profile;
  },
);
