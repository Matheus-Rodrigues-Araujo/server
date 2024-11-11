import { PartialType } from '@nestjs/mapped-types';
import { CreateAnelDto } from './createAnelDto';

export class UpdateAnelDto extends PartialType(CreateAnelDto) {}
