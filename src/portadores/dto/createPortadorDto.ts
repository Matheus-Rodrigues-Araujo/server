import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreatePortadorDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsEnum(['Elfo', 'Anão', 'Homem', 'Sauron'])
  tipo: 'Elfo' | 'Anão' | 'Homem' | 'Sauron';
}
