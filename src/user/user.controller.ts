import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { get } from 'http';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async postUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('service') service: string,
    @Body('userHashtag') userHashtag: string,
  ) {
    await this.userService.createUser(email, password, service, userHashtag);

    return;
  }

  @Get()
  async getUserByEmail(@Body('email') email: string) {
    const existingUser = await this.userService.getUserByEmail(email);

    return existingUser.email;
  }
}
