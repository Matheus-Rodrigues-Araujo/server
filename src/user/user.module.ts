import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Anel } from '../aneis/anel.entity';
import { AuthModule } from 'src/auth/auth.module';
// import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Anel])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
