import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * `LocalAuthGuard` 클래스는 NestJS의 `AuthGuard`를 확장하여 로컬 인증을 처리하는 클래스입니다.
 *
 * `handleRequest` 메서드는 인증 결과를 처리합니다.
 * 인증에 실패한 경우 `UnauthorizedException` 예외가 발생합니다.
 *
 * @author Hojun Song
 */

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
