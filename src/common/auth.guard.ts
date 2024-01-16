import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from './tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
        // Note: A very simple guard that only checks the existence of a valid token
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(' ')[1];
        const user = this.tokenService.decodeAccessToken(token);
        if (!user) throw new Error('User not found');

        request.user = user;
        return true;
    } catch (err) {
        return false;
    }
  }
}
