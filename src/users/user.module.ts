import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { UserEntity } from "src/auth/entities/user.entity";
import { Tenant } from "src/auth/entities/tenant.entity";
import { BoardMember } from "src/auth/entities/boardmember.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, Tenant, BoardMember])],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}