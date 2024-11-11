import { Controller, Post, UseGuards, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateAnelDto } from '../aneis/dto/createAnelDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':userId/anel')
  @UseGuards(AuthGuard)
  async createAnel(
    @Param('userId') userId: number,
    @Body() createAnelDto: CreateAnelDto,
  ) {
    const anel = await this.userService.createAnel(userId, createAnelDto);
    return anel;
  }
}
