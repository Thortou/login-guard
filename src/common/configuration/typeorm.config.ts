import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { IEnv } from "../interfaces/env.interface";
import { models } from "../../infrastructure/adapter/repositories/model";

export enum Connection_DB {
    Main = 'main-connection'
}

export const typeOrmConfig = (): TypeOrmModuleAsyncOptions => ({
    name: Connection_DB.Main,
    useFactory: (config: ConfigService<IEnv>) => ({
        type: 'postgres',
        host: config.get('DB_HOST'), 
        port: config.get('DB_PORT'),
        username: config.get('DB_USER'),
        database: config.get('DB_DATABASE'),
        password: config.get('DB_PASSWORD'),
        entities: models,
        synchronize: true,
        logging: false
    }),
    inject: [ConfigService]
})