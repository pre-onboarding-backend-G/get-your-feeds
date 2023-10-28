import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(
    email: string,
    password: string,
    service: string,
    userHashtag: string,
  ) {
    const userHashtagExists = await this.userModel.exists({
      userHashtag,
    });

    if (userHashtagExists)
      throw new BadRequestException('이미 존재하는 userHashtag');

    const emailExists = await this.userModel.exists({
      email,
    });

    if (emailExists) throw new BadRequestException('이미 존재하는 email');

    const newUser = await this.userModel.create({
      email,
      password,
      connectedServices: [
        {
          service,
          userHashtag,
        },
      ],
    });

    return newUser;
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
