import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) { }

  createVerificationToken(email: string) {
    const token = jwt.sign(
      { email },
      this.configService.get('JWT_VERIFICATION_SECRET'),
      {
        issuer: this.configService.get('JWT_VERIFICATION_TOKEN_ISSUER'),
        subject: this.configService.get('JWT_VERIFICATION_TOKEN_SUBJECT'),
        audience: this.configService.get('JWT_VERIFICATION_TOKEN_AUDIENCE'),
        expiresIn: this.configService.get('JWT_VERIFICATION_EXPIRATION_TIME'),
        algorithm: 'HS256',
      },
    );

    return token;
  }

  createAccessToken(user: Partial<User>) {
    const token = jwt.sign(
      { email: user.email, id: user.id },
      this.configService.get('JWT_SECRET'),
      {
        issuer: this.configService.get('JWT_TOKEN_ISSUER'),
        subject: this.configService.get('JWT_TOKEN_SUBJECT'),
        audience: this.configService.get('JWT_TOKEN_AUDIENCE'),
        expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
        algorithm: 'HS256',
      },
    );

    return token;
  }

  decodeAccessToken(token: string) {
    const decoded = jwt.verify(token, this.configService.get('JWT_SECRET'), {
      issuer: this.configService.get('JWT_TOKEN_ISSUER'),
      subject: this.configService.get('JWT_TOKEN_SUBJECT'),
      audience: this.configService.get('JWT_TOKEN_AUDIENCE'),
      algorithms: ['HS256'],
    });

    return decoded as unknown;
  }

  decodeVerificationToken(token: string) {
    const decoded = jwt.verify(
      token,
      this.configService.get('JWT_VERIFICATION_SECRET'),
      {
        issuer: this.configService.get('JWT_VERIFICATION_TOKEN_ISSUER'),
        subject: this.configService.get('JWT_VERIFICATION_TOKEN_SUBJECT'),
        audience: this.configService.get('JWT_VERIFICATION_TOKEN_AUDIENCE'),
        algorithms: ['HS256'],
      },
    );

    return decoded as unknown;
  }
}
