import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Connection_DB } from "src/common/configuration/typeorm.config";
import { DataSource } from "typeorm";
import { CreateTaskDto, SearchTaskDto } from "./dtos/task.dto";

@Injectable()
export class TaskService {
    constructor(
        @InjectDataSource(Connection_DB.Main)
        private readonly _dataSource: DataSource
    ){}

    async create(createTaskDto: CreateTaskDto): Promise<any>{
        return 'created...'
    }
    async findAll(searchTask: SearchTaskDto): Promise<any>{
        return 'This is return your data in database ...'
    }
    async findOne(id: number): Promise<any>{
        return `This is return data by id ${id}`
    }
    async update(createTaskDto: CreateTaskDto): Promise<any>{
        return 'created...'
    }
    async remove(createTaskDto: CreateTaskDto): Promise<any>{
        return ({status:200, message: 'deleted...'})
    }
}