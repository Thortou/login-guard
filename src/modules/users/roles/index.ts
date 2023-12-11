import { Provider } from "@nestjs/common";
import { RoleTypeOrmRepositoryProvider } from "./role.repo";

export const userDataServices: Provider[] = [
    RoleTypeOrmRepositoryProvider,
  ];