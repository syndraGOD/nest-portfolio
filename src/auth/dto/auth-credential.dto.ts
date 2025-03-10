import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  //영어 & 숫자만
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts eng and num',
  })
  password: string;
}
