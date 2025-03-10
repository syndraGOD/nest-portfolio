import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  //본 코드는 user.repository에
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userRepository.signIn(authCredentialsDto);
  }
}
