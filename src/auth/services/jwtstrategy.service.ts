import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


export const jwtConstants = {
    secret:'mysemilla'
}

@Injectable()
export class JwtstrategyService extends PassportStrategy(Strategy) {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: jwtConstants.secret,
        });     
    }
    async validate(payload:any){
      return{
        id:payload.sub,
        email:payload.email

      }
    }
    
    
}