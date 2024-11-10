import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './usuarios/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PortadorModule } from './portadores/portador.module';
import { AnelModule } from './aneis/anel.entity';
import { UsuarioModule } from './portadores/portadores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.Node_ENV || 'development'}`,
    }),
    UsersModule,
    DatabaseModule,
    PortadorModule,
    AnelModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
