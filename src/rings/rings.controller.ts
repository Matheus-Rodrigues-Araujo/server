import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RingsService } from './rings.service';
import { CreateRingDto } from './dto/create-ring.dto';
import { UpdateRingDto } from './dto/update-ring.dto';

@Controller('rings')
export class RingsController {
  constructor(private readonly ringsService: RingsService) {}

  @Post()
  create(@Body() createRingDto: CreateRingDto) {
    return this.ringsService.create(createRingDto);
  }

  @Get()
  findAll() {
    return this.ringsService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRingDto: UpdateRingDto,
  ) {
    return this.ringsService.update(id, updateRingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ringsService.remove(id);
  }
}
