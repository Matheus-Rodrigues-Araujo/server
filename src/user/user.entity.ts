import { Anel } from 'src/aneis/anel.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Anel, (anel) => anel.portador)
  @JoinTable()
  aneis: Anel[]
}
