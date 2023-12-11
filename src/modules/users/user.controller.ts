import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserModel } from "./entities/user.entity";
import { CreateUserDto, LoginDto } from "./dtos/user.dto";
import { AuthService } from "./auth/auth.service";
import { Public } from "../../common/decorators/public.decorator";
import { LocalAuthGuard } from "src/common/guards/local.auth.guard";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }

    @Public()
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
        return this.userService.create(createUserDto)
    }


    @Public()
    @Get()
    findAll(): Promise<UserModel[]> {
        return this.userService.findAll()
    }

    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    signIn(@Body() signInDto: LoginDto): Promise<UserModel> {
        const { username, password } = signInDto
        return this.authService.signIn(username, password)
    }

    // @UseGuards(AuthGuard)
    // @Get('profile')
    // getProfile(@Request() req) {
    //   return req.user;
    // }
}