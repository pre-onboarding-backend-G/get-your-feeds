// import {
//   Controller,
//   Post,
//   UseGuards,
//   Body,
//   HttpCode,
//   Get,
//   Res,
//   HttpStatus,
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './guards/local-auth.guard';
// import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { Response } from 'express';
// import { TempUser, TempUserDocument } from './tempSchema/tempUser.model';
// import { GetUser } from './decorators/user.decorator';

// @ApiTags('auth')
// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @UseGuards(LocalAuthGuard)
//   @Post('login')
//   @HttpCode(200)
//   @ApiResponse({
//     status: 200,
//     description: 'access token을 반환합니다.',
//     schema: {
//       type: 'object',
//       properties: {
//         accessToken: {
//           type: 'string',
//           example:
//             'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGUiLCJzdWIiOjEsImlhdCI6MTY0NzQ5NzE0MCwiZXhwIjoxNjQ3NDk3NzQwfQ.S5Pvl8vIlYUIMJHs2RY3N6HXydFrlR0_a_se5V5SbXs',
//         },
//       },
//     },
//   })
//   @ApiBody({
//     schema: {
//       type: 'object',
//       properties: {
//         email: { type: 'string', example: 'example@example.com' },
//         password: { type: 'string', example: 'strongpassword123' },
//       },
//     },
//   })
//   async login(@GetUser() user: TempUserDocument, @Res() res: Response) {
//     const token = await this.authService.login(user);
//     res.setHeader('Authorization', `Bearer ${token}`);
//     res.status(HttpStatus.OK).send();
//   }

//   /**
//    * 해당 메서드는 `JwtAuthGuard`를 사용하여 인증된 사용자만 접근할 수 있는 엔드포인트입니다.
//    * 인증된 사용자는 `@GetUser()` 데코레이터를 통해 주입되며, 현재 임시적인 `TempUser` 타입을 갖습니다.
//    * 이 메서드는 인증된 사용자의 정보를 JSON 형태로 반환합니다.
//    *
//    * `@UseGuards(JwtAuthGuard)` 데코레이터를 사용하여 해당 엔드포인트에 인증을 적용할 수 있습니다.
//    *
//    * @param {TempUser} user - NestJS에서 주입된 인증된 사용자의 객체
//    * @returns {Object} - 사용자 ID, 이메일, 및 기타 정보를 포함하는 객체
//    *
//    * @example
//    * GET /auth/test
//    * Headers:
//    * Authorization: Bearer <your_jwt_token>
//    * Response:
//    * {
//    *   "message": "전송 성공, 해당 유저의 정보는 아래와 같습니다.",
//    *   "userId": "<user_id>",
//    *   "userEmail": "<user_email>"
//    * }
//    *
//    * @author Hojun Song
//    */
//   @UseGuards(JwtAuthGuard)
//   @ApiHeader({
//     name: 'Authorization',
//     description: 'auth token',
//     schema: {
//       default: 'default token',
//     },
//   })
//   @Get('test')
//   async testEndpoint(@GetUser() user: TempUserDocument) {
//     return {
//       message: '전송 성공, 해당 유저의 정보는 아래와 같습니다.',
//       userId: user._id.toHexString(),
//       userEmail: user.email,
//     };
//   }

//   @ApiBody({
//     schema: {
//       type: 'object',
//       properties: {
//         email: { type: 'string', example: 'example@example.com' },
//         password: { type: 'string', example: 'strongpassword123' },
//       },
//     },
//   })
//   @Post('register')
//   async tempRegister(@Body() body: any, @Res() res: Response) {
//     try {
//       const createdUser = await this.authService.tempRegister(
//         body.email,
//         body.password,
//       );
//       const token = await this.authService.login(createdUser);
//       res.status(HttpStatus.CREATED).json({ token });
//     } catch (error) {
//       if (error.status === HttpStatus.CONFLICT) {
//         res.status(HttpStatus.CONFLICT).json({ message: error.message });
//       } else {
//         res
//           .status(HttpStatus.INTERNAL_SERVER_ERROR)
//           .json({ message: '서버 오류' });
//       }
//     }
//   }
// }

///////////////////////////////////////////////////////////////////

import { Body, Controller, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  postTokenAccess(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    const newToken = this.authService.rotateToken(token, false);

    return {
      accessToken: newToken,
    };
  }

  @Post('token/refresh')
  postTokenRefresh(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    const newToken = this.authService.rotateToken(token, true);

    return {
      refreshToken: newToken,
    };
  }

  @Post('login/email')
  postLoginEmail(@Headers('authorization') rawToken: string) {
    //Basic Token은 email:password가 basic64로 인코딩되어 있음
    const token = this.authService.extractTokenFromHeader(rawToken, false);

    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithEmail(
      credentials.email,
      credentials.password,
    );
  }

  @Post('register/email')
  postRegisterEmail(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('service') service: string,
    @Body('userHashtag') userHashtag: string,
  ) {
    return this.authService.registerWithEmail(
      email,
      password,
      service,
      userHashtag,
    );
  }
}
