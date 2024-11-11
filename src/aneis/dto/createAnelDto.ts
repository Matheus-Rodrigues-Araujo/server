import { Portador } from 'src/portadores/portador.entity';

export class CreateAnelDto {
  nome: string;
  poder: string;
  portador: Portador[];
  forjadoPor: string;
  imagem: string;
}
