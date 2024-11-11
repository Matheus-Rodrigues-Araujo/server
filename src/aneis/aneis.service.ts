// src/aneis/aneis.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anel } from './anel.entity';
import { CreateAnelDto } from './dto/createAnelDto';
import { UpdateAnelDto } from './dto/updateAnelDto';

@Injectable()
export class AneisService {
  constructor(
    @InjectRepository(Anel)
    private readonly aneisRepository: Repository<Anel>,
  ) {}

  async criar(createAnelDto: CreateAnelDto): Promise<Anel> {
    const { forjadoPor } = createAnelDto;
    const limiteAneis = this.obterLimiteAneisPorForjador(forjadoPor);
    const count = await this.aneisRepository.count({ where: { forjadoPor } });

    if (count >= limiteAneis) {
      throw new BadRequestException(`Limite de anéis para ${forjadoPor} já foi atingido.`);
    }

    const anel = this.aneisRepository.create(createAnelDto);
    return this.aneisRepository.save(anel);
  }

  buscarTodos(): Promise<Anel[]> {
    return this.aneisRepository.find();
  }

  async atualizar(id: number, updateAnelDto: UpdateAnelDto): Promise<Anel> {
    await this.aneisRepository.update(id, updateAnelDto);
    const anelAtualizado = await this.aneisRepository.findOne({ where: { id } });
    if (!anelAtualizado) {
      throw new NotFoundException('Anel não encontrado.');
    }
    return anelAtualizado;
  }

  async remover(id: number): Promise<void> {
    const result = await this.aneisRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Anel não encontrado.');
    }
  }

  private obterLimiteAneisPorForjador(forjador: string): number {
    switch (forjador) {
      case 'Elfos':
        return 3;
      case 'Anões':
        return 7;
      case 'Homens':
        return 9;
      case 'Sauron':
        return 1;
      default:
        throw new BadRequestException('Forjador inválido.');
    }
  }
}
