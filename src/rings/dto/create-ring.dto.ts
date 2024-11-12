import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRingDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  poder: string;

  @IsNotEmpty()
  @IsString()
  portador: string;

  @IsNotEmpty()
  @IsString()
  forjadoPor: string;

  @IsNotEmpty()
  @IsString()
  imagem: string;
}
