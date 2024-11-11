import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anel } from './anel.entity';
import { AneisController } from './aneis.controller';
import { AneisService } from './aneis.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Anel]), AuthModule],
  controllers: [AneisController],
  providers: [AneisService],
})
export class AneisModule {}
