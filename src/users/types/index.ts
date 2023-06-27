import { ApiProperty } from "@nestjs/swagger";

export class LoginUserRequest {
    @ApiProperty({ example: 'Ivan' })
    username: string;

    @ApiProperty({ example: 'Ivan123' })
    password: string;
}

export class LoginUserResponse {
    @ApiProperty({
        example: {
            user: {
                userId: 1,
                username: 'Ivan',
                password: '123'
            }
        }
    })
    user: {
        userId: string;
        username: string;
        password: string;
    }

    @ApiProperty({ example: 'logged in' })
    msg: string;
}

export class SingupRequest {
    @ApiProperty({ example: 'Ivan' })
    username: string;

    @ApiProperty({ example: 'Ivan123' })
    password: string;

    @ApiProperty({ example: 'Ivan123@mail.ru' })
    email: string;
}


export class SingupResponse {
    @ApiProperty({ example: 1 })
    id: string;

    @ApiProperty({ example: 'Ivan' })
    username: string;

    @ApiProperty({ example: '123' })
    password: string;

    @ApiProperty({ example: 'Ivan@example.com' })
    email: string;

    @ApiProperty({ example: '2023-06-23T20:01:14.896Z' })
    updatedAt: Date;

    @ApiProperty({ example: '2023-06-23T20:01:14.896Z' })
    createdAt: Date;
}


export class LogoutResponse {
    @ApiProperty({ example: 'Log out' })
    msg: string;


}

export class UserCheckResponse {
    @ApiProperty({ example: 1 })
    userId: string;

    @ApiProperty({ example: 'Ivan' })
    username: string;

    @ApiProperty({ example: 'Ivan@example.com' })
    email: string;

}

