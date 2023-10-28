import { UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;

  beforeEach(() => {
    jwtAuthGuard = new JwtAuthGuard();
  });

  it('User가 정의되면 User를 Return해야 합니다.', () => {
    const result = jwtAuthGuard.handleRequest(null, 'user', null);
    expect(result).toEqual('user');
  });

  it('User가 정의되지 않으면, UnauthorizedException 예외를 반환해야 합니다.', () => {
    expect(() => jwtAuthGuard.handleRequest(null, null, null)).toThrow(
      UnauthorizedException,
    );
  });
});
