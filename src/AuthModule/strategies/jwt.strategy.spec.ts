import { Model } from 'mongoose';
import { JwtStrategy } from './jwt.strategy';
import { TempUserDocument } from '../tempSchema/tempUser.model';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let tempUserModel: Model<TempUserDocument>;
  const originalJwtSecret = process.env.JWT_SECRET;

  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret-key';
  });

  afterAll(() => {
    process.env.JWT_SECRET = originalJwtSecret;
  });

  beforeEach(() => {
    tempUserModel = { findById: jest.fn() } as any;
    jwtStrategy = new JwtStrategy(tempUserModel);
  });

  it('Validate된 유저는 유저 정보를 반환 해야합니다.', async () => {
    jest
      .spyOn(tempUserModel, 'findById')
      .mockResolvedValue({ _id: 'id', email: 'email' } as any);
    const payload = { sub: 'userId' };
    const result = await jwtStrategy.validate(payload);
    expect(result).toEqual({ userId: 'id', email: 'email' });
  });

  it('사용자를 찾을 수 없으면, UnauthorizedException을 예외를 반환해야 합니다.', async () => {
    jest.spyOn(tempUserModel, 'findById').mockResolvedValue(null);
    const payload = { sub: 'userId' };
    await expect(jwtStrategy.validate(payload)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
