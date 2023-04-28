import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { Tenant } from 'src/auth/entities/tenant.entity';
import { BoardMember } from 'src/auth/entities/boardmember.entity';
import { Role } from './role';

export type User = any;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    @InjectRepository(BoardMember)
    private boardMemberRepository: Repository<BoardMember>,
  ) {}

  async findUserId(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async findOne(username: string): Promise<UserEntity> {
    const result = await this.userRepository.findOne({
      where: { username: username },
      relations: { tenant: true },
    });
    console.log('findOne', result);

    return result;
  }

  async createUser(username: string, password: string): Promise<User> {
    return this.userRepository.save({ username, password });
  }

  async createTenant(
    username: string,
    password: string,
    email: string,
  ): Promise<Tenant> {
    const user: User = { username, password };

    const savedUser = await this.userRepository.save(user);
    const tenant = { email, user: savedUser };
    const savedTenant = await this.tenantRepository.save(tenant);

    return savedTenant;
  }

  async createBoardMember(
    username: string,
    password: string,
    phone: string,
  ): Promise<BoardMember> {
    const user: User = { username, password, role: Role.Admin};
    
    const savedUser = await this.userRepository.save(user);
    const boardMember = {phone, user: savedUser};
    const savedBoardMember = await this.boardMemberRepository.save(boardMember);
    
    return savedBoardMember;

  }
}
