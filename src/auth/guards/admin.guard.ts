import { Injectable, CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { Role } from "src/users/role";
import { UserService } from "src/users/user.service";


@Injectable()
export class AdminGuard implements CanActivate {
    constructor(@Inject(UserService) private userService: UserService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const userId = request.user.id;

        const user = await this.userService.findUserId(userId);

        return user && user.role === Role.Admin;
        
    }
}