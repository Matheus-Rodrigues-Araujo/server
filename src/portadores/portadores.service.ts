import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Anel } from './../aneis/anel.entity';
import { Portador } from './portador.entity';

import { CreatePortadorDto } from './dto/createPortadorDto';
import { UpdatePortadorDto } from './dto/updatePortadorDto';

@Injectable()
export class PortadoresService {
  constructor(
    @InjectRepository(Portador)
    private readonly portadoresRepository: Repository<Portador>,
    @InjectRepository(Anel) private readonly aneisRepository: Repository<Anel>,
  ) {}

  async findAll(): Promise<Portador[]> {
    return await this.portadoresRepository.find();
  }

  async findOne(id: string): Promise<Portador> {
    const portador = await this.portadoresRepository.findOne({
      where: { id },
      relations: ['aneis'],
    });

    if (!portador) {
      throw new NotFoundException(`Portador com Id:${id} não encontrado`);
    }
    return portador;
  }

  async create(createPortadorDto: CreatePortadorDto): Promise<Portador> {
    const newPortador = this.portadoresRepository.create(createPortadorDto);
    if (!newPortador) throw new BadRequestException('Erro ao criar portador');
    return this.aneisRepository.save(newPortador);
  }

  async update(
    id: string,
    updatePortadorDto: UpdatePortadorDto,
  ): Promise<Portador> {
    const portador = await this.portadoresRepository.findOne({ where: { id } });
    if (!portador) throw new NotFoundException(`Portador com ${id} não existe`);

    const updatedPortador = await this.portadoresRepository.update(
      id,
      updatePortadorDto,
    );
    if (!updatedPortador) {
      throw new BadRequestException('Erro ao atualizar o portador');
    }
    return this.portadoresRepository.save(portador);
  }

  async delete(id: string): Promise<void> {
    const result = await this.portadoresRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Portador com Id:${id} não encontrado`);
    }
  }

  async addAnel(portadorId: string, anelId: string) {
    const portador = await this.findOne(portadorId);
    const anel = await this.aneisRepository.findOne({ where: { id: anelId } });

    if (!anel) {
      throw new NotFoundException(`Anel com Id:${anelId} não encontrado`);
    }

    portador.aneis = [...portador.aneis, anel];
    return this.portadoresRepository.save(portador);
  }
}
