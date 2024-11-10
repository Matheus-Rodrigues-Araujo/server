import { Module } from '@nestjs/common';
import { PortadoresService } from './portadores.service';
import { PortadoresController } from './portadores.controller';

@Module({
  providers: [PortadoresService],
  controllers: [PortadoresController]
})
export class UsuarioModule {}
