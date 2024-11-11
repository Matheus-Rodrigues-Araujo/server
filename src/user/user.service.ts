import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { Anel } from '../aneis/anel.entity';
import { CreateAnelDto } from '../aneis/dto/createAnelDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Anel)
    private aneisRepository: Repository<Anel>,
  ) {}


  async create(username: string, password: string): Promise<User>{
      const user = this.userRepository.create({username, password})
      return this.userRepository.save(user)
  }


  async createAnel(
    userId: number,
    createAnelDto: CreateAnelDto,
  ): Promise<Anel> {
    const user = this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['aneis'],
    });

    if (!user) throw new Error('Usuário não foi encontrado!');

    const anel = this.aneisRepository.create(createAnelDto);
    await this.aneisRepository.save(anel);

    return anel;
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
