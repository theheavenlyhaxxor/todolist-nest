// used jwt authguard that only the logged in ones can access the data

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { AuthGuard } from '../guards/guards';

@UseGuards(AuthGuard)
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  create(@Body() createPositionDto: CreatePositionDto, @Req() req: any) {
    return this.positionService.create(createPositionDto, req.userId);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.positionService.findAll(req.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.positionService.findOne(+id, req.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionService.update(+id, updatePositionDto, req.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.positionService.remove(+id, req.userId);
  }

  @Put(':id')
  patch(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionService.patch(+id, updatePositionDto, req.userId);
  }
}
