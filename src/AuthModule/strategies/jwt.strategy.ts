import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TempUser, TempUserDocument } from '../tempSchema/tempUser.model';

/**
 * `JwtStrategy` 클래스는 Passport의 `Strategy`를 확장하여 JWT 인증 전략을 정의하는 클래스입니다.
 *
 * 생성자에서는 JWT 토큰에서 정보를 추출하고 검증하는 방법을 정의하며,
 * `validate` 메서드에서는 추출된 정보를 사용하여 사용자를 검증하고 결과를 반환합니다.
 *
 * @author Hojun Song
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(TempUser.name) private tempUserModel: Model<TempUserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.tempUserModel.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { userId: user._id.toString(), email: user.email };
  }
}
