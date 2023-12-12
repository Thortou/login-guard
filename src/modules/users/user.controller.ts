import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserModel } from "./entities/user.entity";
import { CreateUserDto, LoginDto } from "./dtos/user.dto";
import { AuthService } from "./auth/auth.service";
import { Public } from "../../common/decorators/public.decorator";
import { AuthGuard } from "./auth/auth.guard";
import { LocalAuthGuard } from "src/common/guards/local.auth.guard";

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService
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
        return this.authService.login(username, password)
    }

    // @UseGuards(AuthGuard)
    // @Public()
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}