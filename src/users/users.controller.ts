import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from '../auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LoginUserRequest, LoginUserResponse, LogoutResponse, SingupRequest, SingupResponse } from './types';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @ApiBody({ type: SingupRequest })
    @ApiOkResponse({ type: SingupResponse })
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'application/json')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @ApiBody({ type: LoginUserRequest })
    @ApiOkResponse({ type: LoginUserResponse })
    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    login(@Request() req) {
        return { user: req.user, msg: 'Logged in' }
    }


    @ApiOkResponse({ type: LoginUserResponse })
    @Get('/login-check')
    @UseGuards(AuthenticatedGuard)
    loginCheck(@Request() req) {
        return req.user
    }

    @ApiOkResponse({ type: LogoutResponse })
    @Get('/logout')
    logout(@Request() req) {
        req.session.destroy()
        return { message: 'Log out' }
    }
}
