import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password, group } = registerDto;

    // Check if user exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
      group,
    });

    return { message: 'User registered successfully', userId: user._id };
  }

  async login(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user._id, email: user.email, group: user.group };
    const token = this.jwtService.sign(payload);

    // Store JWT in HttpOnly cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // set true if HTTPS
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1h
    });

    return { message: 'Login successful' };
  }

  async logout(res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }
}
