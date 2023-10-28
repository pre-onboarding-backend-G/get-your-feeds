import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

/**
 * `LocalStrategy` 클래스는 Passport의 `Strategy`를 확장하여 로컬 인증 전략을 정의하는 클래스입니다.
 *
 * 생성자에서는 사용자 이름과 비밀번호 필드의 이름을 정의하며,
 * `validate` 메서드에서는 주어진 이메일과 비밀번호를 사용하여 사용자를 검증하고 결과를 반환합니다.
 *
 * @author Hojun Song
 */

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
