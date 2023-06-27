import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'Ivan' })
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ example: 'Ivan123' })
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({ example: 'Ivan123@mail.com' })
    @IsNotEmpty()
    readonly email: string;
}