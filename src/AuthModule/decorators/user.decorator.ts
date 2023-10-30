import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/user/schema/user.schema';

/**
 * `GetUser`는 커스텀 파라미터 데코레이터입니다.
 * 이 데코레이터는 현재 요청의 사용자 정보를 추출하여 컨트롤러의 핸들러 메서드에 주입하는 역할을 합니다.
 *
 * @param {unknown} data - 데코레이터에 전달된 데이터 (이 경우에는 사용되지 않습니다.)
 * @param {ExecutionContext} ctx - 현재 실행중인 요청/응답 사이클에 대한 컨텍스트 정보
 * @returns {User} - 요청 객체에서 추출된 사용자 정보
 */

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException();
    }

    // 새로운 토큰이 재발급된 경우
    if ('accessToken' in request.user) {
      throw new UnauthorizedException('Token expired, please refresh token');
    }

    // 사용자 정보 반환
    return request.user as User;
  },
);
