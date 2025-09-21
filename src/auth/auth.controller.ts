import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/dtos/login.dto';
import { RegisterDto } from '@/auth/dtos/register.dto';
import { Public } from '@/common/decorators/public.decorator';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response, // ✅ inject res
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    const token = await this.authService.login(user);

    // ✅ set cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // use true with HTTPS
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    return { message: 'Login successful' };
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
