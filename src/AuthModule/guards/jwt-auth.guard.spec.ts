import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from '../auth.service';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let mockAuthService: Partial<AuthService>;
  let mockExecutionContext: ExecutionContext;

  beforeEach(() => {
    mockAuthService = {
      createToken: jest.fn().mockReturnValue('newToken'),
    };

    jwtAuthGuard = new JwtAuthGuard(mockAuthService as AuthService);
    mockExecutionContext = {} as ExecutionContext;
  });

  it('User가 정의되면 User를 Return해야 합니다.', () => {
    const user = { id: '1', username: 'test' };
    const result = jwtAuthGuard.handleRequest(
      null,
      user,
      null,
      mockExecutionContext,
    );
    expect(result).toEqual(user);
  });

  it('User가 정의되지 않으면, UnauthorizedException 예외를 반환해야 합니다.', () => {
    expect(() =>
      jwtAuthGuard.handleRequest(null, null, null, mockExecutionContext),
    ).toThrow(UnauthorizedException);
  });
});
