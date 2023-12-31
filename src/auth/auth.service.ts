import {
  ConflictException,
  Injectable,
  Res,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { VerificationData } from './types/verification.data';

@Injectable()
export class AuthService {
  private verificationCodes: Map<string, VerificationData> = new Map();
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  /**
   * `login` 메서드는 주어진 사용자 정보를 사용하여 JWT 토큰을 생성합니다.
   * 생성된 토큰은 클라이언트에게 전달되어 인증에 사용됩니다.
   *
   * @param {user} user - 로그인할 사용자의 Mongoose 문서 객체
   * @returns {Promise<string>} - 생성된 JWT 토큰
   *
   * @author Hojun Song
   */

  async login(user: User): Promise<string> {
    const userIdAsString = user._id.toString();
    const payload = { sub: userIdAsString };
    return this.jwtService.sign(payload);
  }

  createToken(userId: string): string {
    const payload = { sub: userId };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        return null;
      }
    }
    return user;
  }

  async register(registerUserDto: RegisterUserDto): Promise<void> {
    const { email, password, connectedServices } = registerUserDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }
    const hash = await bcrypt.hash(password, 10);

    const verificationCode = Math.random().toString().slice(-6);
    const expires = Date.now() + 5 * 60 * 1000;

    this.verificationCodes.set(email, {
      email,
      password: hash,
      connectedServices,
      code: verificationCode,
      expires,
    });

    // 이메일로 전송하는 로직 추가 예정
    console.log(`Verification code for ${email}: ${verificationCode}`);
  }

  async verify(email: string, code: string): Promise<void> {
    const storedData = this.verificationCodes.get(email);
    if (!storedData) {
      throw new NotFoundException('가입하지 않은 이메일입니다.');
    }
    if (Date.now() > storedData.expires) {
      throw new BadRequestException('인증번호가 만료되었습니다.');
    }
    if (storedData.code !== code) {
      throw new BadRequestException('인증번호가 일치하지 않습니다.');
    }

    const createdUser = new this.userModel({
      email: storedData.email,
      password: storedData.password,
      connectedServices: storedData.connectedServices,
    });
    await createdUser.save();

    // 인증이 완료되었으므로 저장된 데이터 삭제
    this.verificationCodes.delete(email);
    return;
  }

  /**
   * 토큰 재발급.
   *    - 에러 처리 : accessToken인 경우
   *
   * @param token
   * @param isRefreshToken
   * @returns refreshToken
   *
   * @author SangUn Lee
   */
  rotateToken(token: string, isRefreshToken: boolean) {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const payload = this.jwtService.verify(token, {
      secret: jwtSecret,
    });
    if (payload.type !== 'refresh')
      throw new UnauthorizedException('토큰 재발급은 refresh 토큰으로만 가능');

    return this.signToken(payload.email, payload.id, isRefreshToken);
  }

  /**
   * email, id를 입력받아 JWT를 발급.
   *    - payload : email, id, type
   *    - 토큰 만료 시간
   *        - accessToken : 1h
   *        - refreshToken : 10h
   *
   * @param email
   * @param id
   * @param isRefreshToken
   * @returns token
   *
   * @author SangUn Lee
   */
  signToken(email: string, id: number, isRefreshToken: boolean) {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const payload = {
      email: email,
      sub: id,
      type: isRefreshToken ? 'refresh' : 'access',
    };
    return this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: isRefreshToken ? 36000 : 3600,
    });
  }

  /**
   * 요청 헤더에서 토큰을 추출.
   *    - 공백 기준으로 문자열 나누기
   *    - Bearer, Basic 판단
   *    - 에러 처리 : 나눈 문자열의 길이가 2가 아니거나 입력받은 접두어가 잘못된 경우
   *
   * @param header
   * @param isBearer
   * @returns token
   *
   * @author SangUn Lee
   */
  extractTokenFromHeader(header: string, isBearer: boolean) {
    const splitToken = header.split(' ');
    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix)
      throw new UnauthorizedException('잘못된 토큰');

    const token = splitToken[1];

    return token;
  }
}
