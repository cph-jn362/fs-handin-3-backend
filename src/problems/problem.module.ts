import { Module } from '@nestjs/common';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemEntity } from './entities/problem.entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { Tenant } from 'src/auth/entities/tenant.entity';
import { BoardMember } from 'src/auth/entities/boardmember.entity';
import { UserService } from 'src/users/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([ProblemEntity, UserEntity, Tenant, BoardMember]), AuthModule, HttpModule],
  controllers: [ProblemController],
  providers: [ProblemService, UserService], 
})
export class ProblemModule {}
