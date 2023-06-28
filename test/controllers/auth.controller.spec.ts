import { INestApplication } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from "src/config/configuration";
import { SequelizeConfigService } from "src/config/sequelizeConfig.service";
import * as bcrypt from 'bcrypt';
import { afterEach } from "node:test";
import * as request from 'supertest';
import { User } from "src/users/users.model";
import * as session from 'express-session'
import * as passport from 'passport'
import { AuthModule } from "src/auth/auth.module";

const mockerUser = {
    username: 'testJohn',
    email: 'test@example.com',
    password: 'test123'
}

describe('Auth Controller', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRootAsync({
                    imports: [ConfigModule],
                    useClass: SequelizeConfigService,
                }),
                ConfigModule.forRoot({
                    load: [databaseConfig],
                }),
                AuthModule,
            ]
        }).compile();

        app = testModule.createNestApplication();
        app.use(session({
            secret: 'keyword',
            resave: false,
            saveUninitialized: false,
        }))
        app.use(passport.initialize());
        app.use(passport.session());
        await app.init();
    })

    beforeEach(async () => {
        const user = new User();

        const hash = await bcrypt.hash(mockerUser.password, 10)

        user.username = mockerUser.username;
        user.password = hash;
        user.email = mockerUser.email;
        return user.save();
    })

    afterEach(async () => {
        await User.destroy({ where: { username: 'testJohn' } })
    })

    it('should login user', async () => {

        const response = await request(app.getHttpServer())
            .post('/users/login')
            .send({ username: mockerUser.username, password: mockerUser.password });



        expect(response.body.user.username).toBe(mockerUser.username)
        expect(response.body.msg).toBe('Logged in')
        expect(response.body.user.email).toBe(mockerUser.email)
    })

    it('should log out user', async () => {
        const login = await request(app.getHttpServer())
            .post('/users/login')
            .set({ username: mockerUser.username, password: mockerUser.password });

        const loginCheck = await request(app.getHttpServer())
            .get('/users/login-check')
            .set('Cookie', login.headers['set-cookie']);

        expect(loginCheck.body.user.username).toBe(mockerUser.username)
        expect(loginCheck.body.email).toBe(mockerUser.email)

    })
})