import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Anel } from './anel.entity';
import { AneisController } from './aneis.controller';
import { AneisService } from './aneis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Anel])],
  controllers: [AneisController],
  providers: [AneisService],
  exports: [TypeOrmModule],
})
export class AneisModule {}
