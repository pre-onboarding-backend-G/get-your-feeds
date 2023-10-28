import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: Partial<AuthService>;

  beforeEach(() => {
    authService = { validateUser: jest.fn() };
    localStrategy = new LocalStrategy(authService as any);
  });

  it('Validate된 유저는 유저 정보를 반환 해야합니다.', async () => {
    jest.spyOn(authService, 'validateUser').mockResolvedValue('user');
    const result = await localStrategy.validate('email', 'password');
    expect(result).toEqual('user');
  });

  it('사용자를 찾을 수 없으면, UnauthorizedException을 예외를 반환해야 합니다.', async () => {
    jest.spyOn(authService, 'validateUser').mockResolvedValue(null);
    await expect(localStrategy.validate('email', 'password')).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
