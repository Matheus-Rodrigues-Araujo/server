import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Anel } from './anel.entity';
import { Portador } from './../portadores/portador.entity';
import { CreateAnelDto } from './dto/createAnelDto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AneisService {
  constructor(
    @InjectRepository(Anel) private aneisRepository: Repository<Anel>,
    @InjectRepository(Portador) private readonly portadoresRepository: Repository<Portador>,
  ) {}

  async findAll() {
    return await this.aneisRepository.find();
  }

  async findOne(id: string) {
    return await this.aneisRepository.findOne({
      where: { id },
    });
  }

  async create(
    createAnelDto: CreateAnelDto,
    portadorId: string,
  ): Promise<Anel> {
    const anel = this.aneisRepository.create(createAnelDto);
    const portador = await this.portadoresRepository.findOne({
      where: { id: portadorId },
    });
    if (!portador) throw new Error('Portador não encontrado!');
    anel.portador = [...anel.portador, portador];

    return this.aneisRepository.save(anel);
  }

  async update(id: string, anelAtualizado: any) {
    await this.aneisRepository.update(id, anelAtualizado);
    return this.aneisRepository.findOne({ where: { id } });
  }

  async delete(id: string) {
    await this.aneisRepository.delete(id);
  }
}
