import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Portador } from '../portadores/portador.entity';

@Entity()
export class Anel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  poder: string;

  @ManyToMany(() => Portador, (p) => p.aneis)
  @JoinTable()
  portador: Portador[];

  @Column()
  forjadoPor: string;

  @Column()
  imagem: string;
}
