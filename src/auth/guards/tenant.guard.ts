import { Injectable, Inject, CanActivate, ExecutionContext } from "@nestjs/common";
import { Role } from "src/users/role";
import { UserService } from "src/users/user.service";

@Injectable()
export class TenantGuard implements CanActivate {
    constructor(@Inject(UserService) private userService: UserService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId: number = request.user.id;

        const user = await this.userService.findUserId(userId);
        console.log("user in guard", user);

        return user && user.role === Role.User       
    }
}