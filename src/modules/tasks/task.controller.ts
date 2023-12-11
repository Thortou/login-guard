import { Controller, Post, Body, Get, Put, Delete, Query, Param } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto, SearchTaskDto } from "./dtos/task.dto";
import { Public } from "src/common/decorators/public.decorator";
import { Permission } from "../users/entities/permission.entity";
import { Permissions } from "src/common/decorators/permission.decorator";

@Controller('Tasks')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ){}
    
    @Permissions(Permission.CREATE_TASK)
    @Post()
    create(@Body() createTaskDto: CreateTaskDto): Promise<any> {
        return this.taskService.create(createTaskDto)
    }
    
    // @Public()
    @Permissions(Permission.READ_TASK)
    @Get()
    findAll(@Query() querData: SearchTaskDto): Promise<any> {
        return this.taskService.findAll(querData)
    }

    @Permissions(Permission.READ_TASK)
    @Get(':id')
    findOne(@Param('id') id: number): Promise<any> {
        return this.taskService.create(id)
    }

    @Permissions(Permission.UPDATE_TASK)
    @Put()
    update(@Body() createTaskDto: CreateTaskDto): Promise<any> {
        return this.taskService.create(createTaskDto)
    }

    @Permissions(Permission.DELETE_TASK)
    @Delete()
    deleted(@Body() createTaskDto: CreateTaskDto): Promise<any> {
        return this.taskService.remove(createTaskDto)
    }
}