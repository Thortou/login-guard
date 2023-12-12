import { ConfigService } from "@nestjs/config";
import { IEnv } from "../interfaces/env.interface";
import { JwtModuleOptions } from "@nestjs/jwt";

export const jwtConfig = (config: ConfigService<IEnv>): JwtModuleOptions => ({
    global: true,
    // secret: 'kjkljkhuhuihjkjwtSecret',
    secret: config.get('JWT_SECRET'),
    signOptions: { expiresIn: '183d' },
  });