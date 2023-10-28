import { ConflictException, Injectable, Res, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TempUser, TempUserDocument } from './tempSchema/tempUser.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(TempUser.name) private tempUserModel: Model<TempUserDocument>,
  ) {}

  /**
   * `login` 메서드는 주어진 사용자 정보를 사용하여 JWT 토큰을 생성합니다.
   * 생성된 토큰은 클라이언트에게 전달되어 인증에 사용됩니다.
   *
   * @param {TempUserDocument} user - 로그인할 사용자의 Mongoose 문서 객체
   * @returns {Promise<string>} - 생성된 JWT 토큰
   *
   * @author Hojun Song
   */

  async login(user: TempUserDocument): Promise<string> {
    const userIdAsString = user._id.toString();
    const payload = { sub: userIdAsString };
    return this.jwtService.sign(payload);
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<TempUserDocument | null> {
    const user = await this.tempUserModel.findOne({ email });
    if (user && user.password === pass) {
      //const isMatch = await bcrypt.compare(pass, user.password);와 같은 비밀번호 검증 로직 추가
      return user;
    }
    return null;
  }

  async tempRegister(
    email: string,
    password: string,
  ): Promise<TempUserDocument> {
    const existingUser = await this.tempUserModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const createdUser = new this.tempUserModel({ email, password });
    await createdUser.save();
    return createdUser;
  }
}
