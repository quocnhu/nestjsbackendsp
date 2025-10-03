import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Instead of only reading from Authorization header,
      // check cookies as well
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          console.log('🍪 Checking cookies for JWT:', req.cookies);
          return req?.cookies?.access_token; // 👈 read JWT from cookie
        },
        // ExtractJwt.fromAuthHeaderAsBearerToken(), // fallback
      ]),
      ignoreExpiration: false,
      secretOrKey: 'hardcoded_secret', // must match AuthService
    });
  }

  async validate(payload : any) {
    console.log('✅ Decoded JWT payload:', payload);
    return { userId: payload.sub, email: payload.email, group: payload.group };
  }
}


