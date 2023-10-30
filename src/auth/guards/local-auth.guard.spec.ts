import { UnauthorizedException } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

describe('LocalAuthGuard', () => {
  let localAuthGuard: LocalAuthGuard;

  beforeEach(() => {
    localAuthGuard = new LocalAuthGuard();
  });

  it('User가 정의되면 User를 Return해야 합니다.', () => {
    const result = localAuthGuard.handleRequest(null, 'user', null);
    expect(result).toEqual('user');
  });

  it('User가 정의되지 않으면, UnauthorizedException 예외를 반환해야 합니다.', () => {
    expect(() => localAuthGuard.handleRequest(null, null, null)).toThrow(
      UnauthorizedException,
    );
  });
});
