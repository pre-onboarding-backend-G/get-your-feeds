import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService, // @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  //
  private readonly users = [
    {
      userId: '1',
      username: 'Mizong',
    },
    {
      userId: '2',
      username: 'MS',
    },
  ];

  //   async validateUser(userId: string): Promise<any> {
  //     const user = await this.userModel.findById(userId);
  //     if (user) {
  //       return user;
  //     }
  //     return null;
  //   }

  async validateUser(userId: string): Promise<any> {
    const user = this.users.find((u) => u.userId === userId);
    if (user) {
      return user;
    }
    return null;
  }

  async login(userId: string) {
    const user = await this.validateUser(userId);
    if (!user) {
      return null;
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
