import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JWT_SECRET } from '../config';
// import { PersonStatus } from '../common/enums/person-status.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (private readonly authService: AuthService) {
    super ({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqRoCalback: true,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload, done: Function) {
    const user = await this.authService.validateUser(payload);
    done(null, user);
  }
}
