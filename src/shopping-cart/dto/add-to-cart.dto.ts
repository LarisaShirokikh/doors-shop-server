import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddToCardDto {
    @ApiProperty({ example: 'Ivan' })
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ example: '1' })
    @IsNotEmpty()
    readonly userId?: string;

    @ApiProperty({ example: '1' })
    @IsNotEmpty()
    readonly doorsId: string;
}
