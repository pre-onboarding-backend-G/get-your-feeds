import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation((payload) => 'testToken'),
          },
        },
        {
          provide: 'TempUserModel',
          useValue: jest.fn(),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('로그인이 되면, Authorization 헤더에 값을 설정합니다', async () => {
      const user = { _id: '123' };
      const response = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await authService.login(user, response);

      expect(jwtService.sign).toHaveBeenCalledWith({ sub: '123' });
      expect(response.setHeader).toHaveBeenCalledWith(
        'Authorization',
        'Bearer testToken',
      );
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.send).toHaveBeenCalled();
    });
  });
});
