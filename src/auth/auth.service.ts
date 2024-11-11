import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/loginDto';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { access_token: accessToken };
  }

  async register(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const existingUser = await this.userService.findOneByUsername(username);
    if (existingUser) {
      throw new ConflictException('Usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.create(
      username,
      hashedPassword,
    );

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }
}
