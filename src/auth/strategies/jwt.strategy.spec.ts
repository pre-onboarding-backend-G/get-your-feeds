import { Model } from 'mongoose';
import { JwtStrategy } from './jwt.strategy';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let UserModel: Model<User>;
  const originalJwtSecret = process.env.JWT_SECRET;

  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret-key';
  });

  afterAll(() => {
    process.env.JWT_SECRET = originalJwtSecret;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: getModelToken('User'),
          useValue: Model,
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    UserModel = module.get<Model<User>>(getModelToken('User'));
  });

  it('Validate된 유저는 유저 정보를 반환 해야합니다.', async () => {
    const mockUser = {
      _id: 'id',
      email: 'email',
      password: 'password',
    } as User;
    jest.spyOn(UserModel, 'findById').mockResolvedValue(mockUser);

    const payload = { sub: 'id' };
    const result = await jwtStrategy.validate(payload);

    expect(result._id).toEqual(mockUser._id);
    expect(result.email).toEqual(mockUser.email);
    expect(result.password).toEqual(mockUser.password);
  });

  it('사용자를 찾을 수 없으면, UnauthorizedException 예외를 반환해야 합니다.', async () => {
    jest.spyOn(UserModel, 'findById').mockResolvedValue(null);
    const payload = { sub: 'userId' };
    await expect(jwtStrategy.validate(payload)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
