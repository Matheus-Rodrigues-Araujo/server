import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('aneis')
export class Anel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  poder: string;

  @ManyToMany(() => User, (user) => user.aneis)
  portador: User[];

  @Column()
  forjadoPor: string;

  @Column()
  imagem: string;
}
