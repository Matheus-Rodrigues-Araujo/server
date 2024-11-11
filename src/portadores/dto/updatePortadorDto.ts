import { PartialType } from '@nestjs/mapped-types';
import { CreatePortadorDto } from './createPortadorDto';

export class UpdatePortadorDto extends PartialType(CreatePortadorDto) {}
