import {
  IsEmail,
  IsString,
  Matches,
  MinLength,
  IsArray,
  ValidateNested,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class ConnectedServiceDto {
  @IsEnum(['twitter', 'facebook', 'instagram', 'thread'], {
    message: '유효하지 않은 서비스입니다.',
  })
  service: string;

  @IsString()
  @IsNotEmpty({ message: 'accountTag는 비어있을 수 없습니다.' })
  accountTag: string;
}

export class RegisterUserDto {
  @IsEmail({}, { message: '유효하지 않은 이메일 주소입니다.' })
  email: string;

  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: '비밀번호는 대문자, 소문자, 숫자, 특수 문자를 포함해야 합니다.',
  })
  password: string;

  @IsArray({ message: 'connectedServices는 배열이어야 합니다.' })
  @ValidateNested({ each: true })
  @Type(() => ConnectedServiceDto)
  connectedServices: ConnectedServiceDto[];
}
