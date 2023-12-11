import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    tel: string;
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    gmail: string;
    @IsNotEmpty()
    @IsString()
    @Length(6)
    password: string;
    @IsNotEmpty()
    @IsString()
    @Length(6)
    comfirm_password: string;
    @IsNotEmpty()
    @IsString()
    first_name: string;
    @IsNotEmpty()
    @IsString()
    @Length(6)
    last_name: string;
    @IsNotEmpty()
    @IsString()
    gender: string;
    dob: Date;

    @IsArray()
    @IsNumber()
    role_id: number[];
}

export class LoginDto {
    username: string;
    password: string;
}