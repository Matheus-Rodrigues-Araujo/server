import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AneisModule } from './aneis/aneis.module';
import { PortadoresModule } from './portadores/portadores.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.Node_ENV || 'development'}`,
    }),
    DatabaseModule,
    PortadoresModule,
    AneisModule,
    PortadoresModule,
  ],
})
export class AppModule {}
