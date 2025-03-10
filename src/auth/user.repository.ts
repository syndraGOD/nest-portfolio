import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      //ER_DUP_ENTRY err = username is already exist
      // console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
      console.log('error', error);
    }
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      //유저 토큰 생성
      const payload = { username };

      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
