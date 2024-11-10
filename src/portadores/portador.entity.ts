import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Anel } from '../aneis/anel.entity';

type TipoPortador = 'Elfo' | 'Anão' | 'Homem' | 'Sauron';

@Entity()
export class Portador {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  tipo: TipoPortador;

  @ManyToMany(() => Anel, (a) => a.portador)
  aneis: Anel[];
}
