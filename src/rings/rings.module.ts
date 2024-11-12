import { Module } from '@nestjs/common';
import { RingsService } from './rings.service';
import { RingsController } from './rings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ring } from './ring.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ring])],
  providers: [RingsService],
  controllers: [RingsController]
})
export class RingsModule {}
