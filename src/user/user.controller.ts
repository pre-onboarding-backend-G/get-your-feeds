import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from './schema/user.schema';

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

  @UseGuards(JwtAuthGuard)
  @Get('account-tags')
  async getAllAccountTags(@GetUser() user: User): Promise<string[]> {
    return this.userService.getAllAccountTags(user.id);
  }
}
