import { ConflictException, Injectable, Res, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
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

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (user && user.password === pass) {
      //const isMatch = await bcrypt.compare(pass, user.password);와 같은 비밀번호 검증 로직 추가
      return user;
    }
    return null;
  }

  async tempRegister(registerUserDto: RegisterUserDto): Promise<User> {
    const { email, password, connectedServices } = registerUserDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const createdUser = new this.userModel({
      email,
      password,
      connectedServices,
    });
    await createdUser.save();
    return createdUser;
  }
}

// import {
//   BadRequestException,
//   HttpException,
//   HttpStatus,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from 'src/user/user.service';
// import * as bcrypt from 'bcryptjs';
// import { ConfigService } from '@nestjs/config';
// @Injectable()
// export class AuthService {
//   private readonly blacklist: string[] = [];

//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly usersService: UserService,
//     private readonly configService: ConfigService,
//   ) {}

//   checkTokenBlacklist(token: string, payload: any) {
//     if (payload.type === 'access') {
//       const isInBlacklist = this.blacklist.includes(token);

//       if (isInBlacklist)
//         throw new HttpException('무효화된 토큰 입니다', HttpStatus.FORBIDDEN);
//     }
//   }

//   invalidateAccessToken(token: string) {
//     this.blacklist.push(token);
//     return;
//   }

//   /**
//    * 요청 헤더에서 토큰을 추출.
//    *    - 공백 기준으로 문자열 나누기
//    *    - Bearer, Basic 판단
//    *    - 에러 처리 : 나눈 문자열의 길이가 2가 아니거나 입력받은 접두어가 잘못된 경우
//    *
//    * @param header
//    * @param isBearer
//    * @returns token
//    *
//    * @author SangUn Lee
//    */
//   extractTokenFromHeader(header: string, isBearer: boolean) {
//     const splitToken = header.split(' ');
//     const prefix = isBearer ? 'Bearer' : 'Basic';

//     if (splitToken.length !== 2 || splitToken[0] !== prefix)
//       throw new UnauthorizedException('잘못된 토큰');

//     const token = splitToken[1];

//     return token;
//   }

//   /**
//    * base64로 인코딩된 email:password를 utf-8로 변환.
//    *    - Basic token은 email:password를 base64로 인코딩
//    *
//    * @param base64String
//    * @returns {email, password}
//    *
//    * @author SangUn Lee
//    */
//   decodeBasicToken(base64String: string) {
//     const decoded = Buffer.from(base64String, 'base64').toString('utf-8');

//     const split = decoded.split(':');

//     if (split.length !== 2)
//       throw new UnauthorizedException('잘못된 유형의 토큰');

//     const email = split[0];
//     const password = split[1];

//     return {
//       email,
//       password,
//     };
//   }

//   /**
//    * JWT 검증.
//    *    - JWT가 정상인 경우 payload를 반환
//    *    - payload : email, id, tokenType(access | refresh)
//    *
//    * @param token
//    * @returns payload
//    *
//    * @author SangUn Lee
//    */
//   verifyToken(token: string) {
//     const jwtSecret = this.configService.get<string>('JWT_SECRET_KEY');
//     const payload = this.jwtService.verify(token, {
//       secret: jwtSecret,
//     });

//     return payload;
//   }

//   /**
//    * 토큰 재발급.
//    *    - 에러 처리 : accessToken인 경우
//    *
//    * @param token
//    * @param isRefreshToken
//    * @returns refreshToken
//    *
//    * @author SangUn Lee
//    */
//   rotateToken(token: string, isRefreshToken: boolean) {
//     const jwtSecret = this.configService.get<string>('JWT_SECRET_KEY');
//     const payload = this.jwtService.verify(token, {
//       secret: jwtSecret,
//     });
//     if (payload.type !== 'refresh')
//       throw new UnauthorizedException('토큰 재발급은 refresh 토큰으로만 가능');

//     return this.signToken(payload.email, payload.id, isRefreshToken);
//   }

//   /**
//    * email, id를 입력받아 JWT를 발급.
//    *    - payload : email, id, type
//    *    - 토큰 만료 시간
//    *        - accessToken : 1h
//    *        - refreshToken : 10h
//    *
//    * @param email
//    * @param id
//    * @param isRefreshToken
//    * @returns token
//    *
//    * @author SangUn Lee
//    */
//   signToken(email: string, id: number, isRefreshToken: boolean) {
//     const jwtSecret = this.configService.get<string>('JWT_SECRET_KEY');
//     const payload = {
//       email: email,
//       sub: id,
//       type: isRefreshToken ? 'refresh' : 'access',
//     };
//     return this.jwtService.sign(payload, {
//       secret: jwtSecret,
//       expiresIn: isRefreshToken ? 36000 : 3600,
//     });
//   }

//   /**
//    * 이메일, 아이디로 accessToken, refreshToken 발급.
//    *
//    * @param email
//    * @param id
//    * @returns accessToken, refreshToken
//    *
//    * @author SangUn Lee
//    */
//   loginUser(email: string, id: number) {
//     return {
//       accessToken: this.signToken(email, id, false),
//       refreshToken: this.signToken(email, id, true),
//     };
//   }

//   /**
//    * email, password 검증.
//    *    - email로 DB에서 해당 user 찾기
//    *    - password를 암호화해서 DB의 암호화된 password와 비교
//    *
//    * @param email
//    * @param password
//    * @returns email, password에 해당하는 user 정보
//    *
//    * @author SangUn Lee
//    */
//   async authWithEmailAndPassword(email: string, password: string) {
//     const existingUser = await this.usersService.getUserByEmail(email);
//     if (!existingUser) throw new UnauthorizedException('존재하지 않는 user');

//     const passOk = await bcrypt.compare(password, existingUser.password);
//     if (!passOk) throw new UnauthorizedException('비밀번호가 틀렸습니다');

//     return existingUser;
//   }

//   /**
//    * email, password로 로그인을 한 뒤, 해당 유저에 대한 accessToken과 refreshToken을 보내줌.
//    *
//    * @param email
//    * @param password
//    * @returns accessToken, refreshToken
//    *
//    * @author SangUn Lee
//    */
//   async loginWithEmail(email: string, password: string) {
//     const existingUser = await this.authWithEmailAndPassword(email, password);

//     return this.loginUser(existingUser.email, existingUser.id);
//   }

//   /**
//    * 회원가입.
//    *    - 비밀번호 검증
//    *    - 비밀번호 암호화
//    *    - 입력받은 정보와 암호화한 비밀번호 저장(회원가입)
//    *
//    * @param email
//    * @param password
//    * @param service
//    * @param userHashtag
//    * @returns accessToken, refreshToken
//    *
//    * @author SangUn Lee
//    */
//   async registerWithEmail(
//     email: string,
//     password: string,
//     service: string,
//     userHashtag: string,
//   ) {
//     this.verifyPassword(email, password, userHashtag);

//     const hash = await bcrypt.hash(password, 10);
//     // const hash = password;

//     const newUser = await this.usersService.createUser(
//       email,
//       hash,
//       service,
//       userHashtag,
//     );

//     return this.loginUser(newUser.email, newUser.id);
//   }

//   /**
//    * 비밀번호 검증. 다음과 같은 경우에 에러.
//    *    1) 길이가 10자 미만인 경우
//    *    2) 자주 사용되는 비밀번호인 경우
//    *    3) 다른 개인 정보가 포함되어 있는 경우
//    *    4) 숫자, 문자, 특수문자 중 2가지 이상으로 구성되지 않은 경우
//    *
//    * @param email
//    * @param password
//    * @param userHashtag
//    *
//    * @author SangUn Lee
//    */
//   verifyPassword(email: string, password: string, userHashtag: string) {
//     if (password.length < 10)
//       throw new BadRequestException('비밀번호 길이는 10자 이상');

//     this.validateCommonPasswords(password);
//     this.validateWithNicknameAndEmail(email, password, userHashtag);

//     // 4)
//     this.validatePasswordComposition(password);
//   }

//   /**
//    * 입력받은 비밀번호가 숫자, 문자, 특수문자 중 2가지 이상인지 검사.
//    *
//    * @param password
//    *
//    * @author SangUn Lee
//    */
//   validatePasswordComposition(password: string) {
//     const hasNumber = /\d/.test(password);
//     const hasLetter = /[a-zA-Z]/.test(password);
//     const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//     const conditionsMet = [hasNumber, hasLetter, hasSpecialCharacter].filter(
//       Boolean,
//     ).length;

//     if (conditionsMet < 2) {
//       throw new BadRequestException(
//         '숫자, 문자, 특수문자 중 2가지 이상이어야함',
//       );
//     }
//   }

//   /**
//    * 입력받은 비밀번호가 자주 사용되는 비밀번호인지 검증.
//    *
//    * @param password
//    *
//    * @author SangUn Lee
//    */
//   validateCommonPasswords(password: string) {
//     const commonPasswords = [
//       'abc123',
//       'password1',
//       '1q2w3e4r',
//       'qwerty123',
//       'zaq12wsx',
//       '1qaz2wsx',
//     ];

//     if (commonPasswords.includes(password)) {
//       throw new BadRequestException('비밀번호가 너무 일반적');
//     }
//   }

//   /**
//    * 비밀번호에 email의 일부, userHashtag가 포함되어 있는지 검증.
//    * @param email
//    * @param password
//    * @param userHashtag
//    *
//    * @author SangUn Lee
//    */
//   validateWithNicknameAndEmail(
//     email: string,
//     password: string,
//     userHashtag: string,
//   ) {
//     const emailPrefix = email.split('@')[0];

//     if (password.includes(userHashtag) || password.includes(emailPrefix)) {
//       throw new BadRequestException(
//         '비밀번호에 별명이나 이메일의 일부를 포함할 수 없습니다.',
//       );
//     }
//   }
// }
