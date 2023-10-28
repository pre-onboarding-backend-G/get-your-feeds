import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema/user.schema';

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
          provide: 'UserModel',
          useValue: jest.fn(),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('로그인이 되면, JWT 토큰을 반환합니다', async () => {
      const user = { _id: '123' } as User;

      const token = await authService.login(user);

      expect(jwtService.sign).toHaveBeenCalledWith({ sub: '123' });
      expect(token).toEqual('testToken');
    });
  });
});
