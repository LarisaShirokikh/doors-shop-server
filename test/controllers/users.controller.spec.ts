import { INestApplication } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from "src/config/configuration";
import { SequelizeConfigService } from "src/config/sequelizeConfig.service";
import { UsersModule } from "src/users/users.module";
import * as bcrypt from 'bcrypt';
import { afterEach } from "node:test";
import * as request from 'supertest';
import { User } from "src/users/users.model";

const mockerUser = {
    username: 'John',
    email: 'John@example.com',
    password: 'password'
}

describe('Users Controller', () => {
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
                UsersModule,
            ]
        }).compile();

        app = testModule.createNestApplication();
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
        await User.destroy({ where: { username: mockerUser.username } })
        await User.destroy({ where: { username: 'Test' } })
    })

    it('should create user', async () => {
        const newUser = {
            username: 'testJohn',
            email: 'test@example.com',
            password: 'test123'
        }
        const response = await request(app.getHttpServer())
            .post('/users/signup')
            .send(newUser);

        const passwordIsValid = await bcrypt.compare(newUser.password, response.body.password)

        expect(response.body.username).toBe(newUser.username)
        expect(passwordIsValid).toBe(true)
        expect(response.body.email).toBe(newUser.email)
    })
})