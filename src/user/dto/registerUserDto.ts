import { ApiProperty } from '@nestjs/swagger';
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
  @IsEnum(['twitter', 'facebook', 'instagram', 'thread'])
  @ApiProperty({
    enum: ['twitter', 'facebook', 'instagram', 'thread'],
    description: '서비스 종류',
  })
  service: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '계정 태그' })
  accountTag: string;
}

export class RegisterUserDto {
  @IsEmail()
  @ApiProperty({ description: '이메일 주소' })
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @ApiProperty({
    description: '비밀번호 (8자 이상, 대소문자, 숫자, 특수문자 포함)',
  })
  password: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectedServiceDto)
  @ApiProperty({
    type: [ConnectedServiceDto],
    description: '연결된 서비스 목록',
  })
  connectedServices: ConnectedServiceDto[];
}
