import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/users/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { localStrategy } from "./strategies/local.strategy";
import { jwtConstants } from "./strategies/constant";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '3600'},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, localStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule{}

