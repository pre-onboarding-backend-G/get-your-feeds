import { ConflictException, Injectable, Res, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TempUser, TempUserDocument } from './tempSchema/tempUser.model';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(TempUser.name) private tempUserModel: Model<TempUserDocument>,
  ) {}

  /**
   * `login` 메서드는 주어진 사용자 정보를 사용하여 로그인을 처리합니다.
   * JWT 토큰을 생성하고, 이를 HTTP 응답 헤더에 추가하여 클라이언트에게 전달합니다.
   *
   * @param {any} user - 로그인할 사용자의 정보. 사용자의 ID를 포함해야 합니다.
   * @param {Response} response - Express의 Response 객체로, HTTP 응답을 관리합니다.
   * @author Hojun Song
   *
   */

  async login(user: any, @Res() response: Response) {
    const payload = { sub: user._id };
    const token = this.jwtService.sign(payload);
    response.setHeader('Authorization', `Bearer ${token}`);
    response.status(HttpStatus.OK).send();
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.tempUserModel.findOne({ email });
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async TempRegister(email: string, password: string, response: Response) {
    const existingUser = await this.tempUserModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const createdUser = new this.tempUserModel({ email, password });
    await createdUser.save();

    return this.login(createdUser, response);
  }
}
