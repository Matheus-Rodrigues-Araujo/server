import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateAnelDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  poder: string;

  @IsString()
  @IsNotEmpty()
  portador: string;

  @IsString()
  @IsNotEmpty()
  forjadoPor: string;

  @IsUrl()
  @IsNotEmpty()
  imagem: string;
}
