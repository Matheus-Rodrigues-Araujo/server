import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ring } from './ring.entity';
import { CreateRingDto } from './dto/create-ring.dto';
import { UpdateRingDto } from './dto/update-ring.dto';

@Injectable()
export class RingsService {
  constructor(
    @InjectRepository(Ring)
    private ringsRepository: Repository<Ring>,
  ) {}

  async create(createRingDto: CreateRingDto): Promise<Ring> {
    const count = await this.ringsRepository.count({ where: { forjadoPor: createRingDto.forjadoPor } });

    if (
      (createRingDto.forjadoPor === 'Elfos' && count >= 3) ||
      (createRingDto.forjadoPor === 'Anões' && count >= 7) ||
      (createRingDto.forjadoPor === 'Homens' && count >= 9) ||
      (createRingDto.forjadoPor === 'Sauron' && count >= 1)
    ) {
      throw new BadRequestException(`Não é possível criar mais anéis para ${createRingDto.forjadoPor}.`);
    }

    const ring = this.ringsRepository.create(createRingDto);
    return this.ringsRepository.save(ring);
  }

  findAll(): Promise<Ring[]> {
    return this.ringsRepository.find();
  }

  async update(id: number, updateRingDto: UpdateRingDto): Promise<Ring> {
    const ring = await this.ringsRepository.preload({
      id: id,
      ...updateRingDto,
    });

    if (!ring) {
      throw new NotFoundException(`Anel com ID ${id} não encontrado.`);
    }

    return this.ringsRepository.save(ring);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ringsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Anel com ID ${id} não encontrado.`);
    }
  }
}
