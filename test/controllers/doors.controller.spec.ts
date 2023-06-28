import { INestApplication } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from "src/config/configuration";
import { SequelizeConfigService } from "src/config/sequelizeConfig.service";
import * as bcrypt from 'bcrypt';
import { afterEach } from "node:test";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";
import { DoorsPartsModule } from "src/doors-parts/doors-parts.module";
import session from "express-session";
import passport from "passport";
import { AuthModule } from "src/auth/auth.module";
import * as request from 'supertest';

const mockedUser = {
    username: 'Jhon',
    email: 'jhon@gmail.com',
    password: 'jhon123',
};


describe('Doors-parts Controller', () => {
    let app: INestApplication;
    let usersService: UsersService;

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
                DoorsPartsModule,
                AuthModule,
            ]
        }).compile();

        app = testModule.createNestApplication();
        app.use(
            session({
                secret: 'keyword',
                resave: false,
                saveUninitialized: false,
            }),
        );
        app.use(passport.initialize());
        app.use(passport.session());
        await app.init();
    })

    beforeEach(async () => {
        const user = new User();

        const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

        user.username = mockedUser.username;
        user.password = hashedPassword;
        user.email = mockedUser.email;

        return user.save();
    });


    afterEach(async () => {
        await User.destroy({ where: { username: mockedUser.username } })
    })

    it('should get one part', async () => {
        const login = await request(app.getHttpServer())
            .post('/users/login')
            .send({ username: mockedUser.username, password: mockedUser.password })

        const response = await request(app.getHttpServer())
            .get('/doors-parts/find/1')
            .set('Cookie', login.headers['set-cookie'])



        expect(response.body).toEqual(expect.objectContaining({
            id: '1',
            price: expect.any(Number),
            doors_manufacturer: expect.any(String),
            vendor_code: expect.any(String),
            name: expect.any(String),
            configuration: expect.any(String),
            description: expect.any(String),
            images: expect.any(String),
            in_stock: expect.any(Number),
            bestseller: expect.any(Boolean),
            new: expect.any(Boolean),
            popularity: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        }))
    })
})