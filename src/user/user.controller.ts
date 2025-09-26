import {
  Controller,
  Delete,
  Patch,
  Get,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/user.update.dto';
import { AuthGuard } from '../guards/guards';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('username')
  async getUserByUsername(@Body('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return this.userService.updateUser(id, userUpdateDto);
  }
}
