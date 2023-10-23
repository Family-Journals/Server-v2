import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as pactum from 'pactum';
import { CreateUserDto } from 'src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    await app.listen(3333);
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Create User', () => {
      const dto: CreateUserDto = {
        email: 'testuser@test.com',
        password: 'testPassword',
        confirmPassword: 'testPassword',
      };
      it('Should create user', () => {
        // return pactum.spec().post('/users').withBody(dto).expectStatus(201);
      });

      it('Should throw if email is empty', () => {
        delete dto.email;
        return pactum
          .spec()
          .post('/users')
          .withBody(dto)
          .expectStatus(400)
          .inspect();
      });

      it('Should throw if password is empty', () => {
        delete dto.password;
        return pactum.spec().post('/users').withBody(dto).expectStatus(400);
      });

      it('Should throw if confirmPassword is empty', () => {
        delete dto.confirmPassword;
        return pactum.spec().post('/users').withBody(dto).expectStatus(400);
      });
    });
  });
});
