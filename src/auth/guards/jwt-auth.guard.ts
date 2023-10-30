import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { TokenExpiredError } from 'jsonwebtoken';
import { Response } from 'express';

/**
 * `JwtAuthGuard` 클래스는 NestJS의 `AuthGuard`를 확장하여 JWT(JSON Web Token) 인증을 처리하는 클래스입니다.
 *
 * `canActivate` 메서드는 인증을 수행하며, `handleRequest` 메서드는 인증 결과를 처리합니다.
 * 인증에 실패한 경우 `UnauthorizedException` 예외가 발생합니다.
 * @author Hojun Song
 */

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info: Error, context: ExecutionContext) {
    if (info instanceof TokenExpiredError) {
      const request = context.switchToHttp().getRequest();
      const newToken = this.authService.createToken(user.id);
      request.user = { ...user, accessToken: newToken };
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
