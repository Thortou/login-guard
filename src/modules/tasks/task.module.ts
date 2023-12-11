import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { taskModel } from "./entities";
import { Connection_DB } from "src/common/configuration/typeorm.config";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
imports: [TypeOrmModule.forFeature(taskModel, Connection_DB.Main)],
controllers: [TaskController],
providers: [TaskService]
})

export class TaskModule {}