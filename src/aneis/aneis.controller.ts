import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { AneisService } from './aneis.service';
import { Anel } from './anel.entity';
import { CreateAnelDto } from './dto/createAnelDto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth-guard';
import { UpdateAnelDto } from './dto/updateAnelDto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('aneis')
export class AneisController {
  constructor(private readonly aneisService: AneisService) {}

  @Get()
  @UseGuards(AuthGuard)
  buscarTodos(): Promise<Anel[]> {
    return this.aneisService.buscarTodos();
  }

  @Post()
  criar(@Body() createAnelDto: CreateAnelDto): Promise<Anel> {
    return this.aneisService.criar(createAnelDto);
  }

  @Put(':id')
  atualizar(
    @Param('id') id: number,
    @Body() updateAnelDto: UpdateAnelDto,
  ): Promise<Anel> {
    return this.aneisService.atualizar(id, updateAnelDto);
  }

  @Delete(':id')
  remover(@Param('id') id: number): Promise<void> {
    return this.aneisService.remover(id);
  }
}
