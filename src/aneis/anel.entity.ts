import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('aneis')
export class Anel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  poder: string;

  @Column()
  portador: string;

  @Column()
  forjadoPor: string;

  @Column()
  imagem: string;
}
