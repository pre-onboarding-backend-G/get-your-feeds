import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  HttpCode,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'access token을 반환합니다.',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGUiLCJzdWIiOjEsImlhdCI6MTY0NzQ5NzE0MCwiZXhwIjoxNjQ3NDk3NzQwfQ.S5Pvl8vIlYUIMJHs2RY3N6HXydFrlR0_a_se5V5SbXs',
        },
      },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'example@example.com' },
        password: { type: 'string', example: 'strongpassword123' },
      },
    },
  })
  async login(@Req() req: any, @Res() res: Response) {
    return this.authService.login(req.user, res);
  }

  /**
   * 해당 메서드는 `JwtAuthGuard`를 사용하여 인증된 사용자만 접근할 수 있는 엔드포인트입니다.
   * 이 메서드는 인증된 사용자의 정보를 반환합니다. UseGuard 데코레이터 사용법을 숙지하여, 적용해주시면 됩니다.
   *
   * @param {any}
   * @returns {Object}
   *
   * @example
   * GET /auth/test
   *
   * Headers:
   * Authorization: Bearer <your_jwt_token>
   *
   * Response:
   * {
   *   "message": "전송 성공, 해당 유저의 정보는 아래와 같습니다.",
   *   "user": {
   *     "userId": "<user_id>",
   *     "email": "<user_email>"
   *   }
   * }
   * @author Hojun Song
   */
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async testEndpoint(@Req() req: any) {
    return {
      message: '전송 성공, 해당 유저의 정보는 아래와 같습니다.',
      user: req.user,
    };
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'example@example.com' },
        password: { type: 'string', example: 'strongpassword123' },
      },
    },
  })
  @Post('register')
  async tempRegister(@Body() body: any, @Res() res: Response) {
    return this.authService.TempRegister(body.email, body.password, res);
  }
}
