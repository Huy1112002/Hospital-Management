import {
    CanActivate,
    ExecutionContext,
    Injectable,
    SetMetadata,
    UnauthorizedException,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorators/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
  

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
    constructor( 
        private reflector: Reflector,
    ) {
        super();
    }
  
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;
        
        return super.canActivate(context);
    }
}