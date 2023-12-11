import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "../../../common/configuration/typeorm.config";

@Global()
@Module({ 
    imports: [TypeOrmModule.forRootAsync(typeOrmConfig())]
})

export class typeOrmRepositoryModule {}