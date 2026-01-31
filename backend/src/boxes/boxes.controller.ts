import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { BoxesService } from './boxes.service';

@Controller('boxes')
export class BoxesController {
  constructor(private readonly boxesService: BoxesService) {}

  @Get()
  list(
    @Query('search') search?: string,
    @Query('location') location?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.boxesService.list({ search, location, from, to });
  }

  @Post()
  create(@Body() body: CreateBoxDto) {
    return this.boxesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateBoxDto) {
    return this.boxesService.update(Number(id), body);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.boxesService.get(Number(id));
  }

  @Get(':id/items')
  items(@Param('id') id: string) {
    return this.boxesService.items(Number(id));
  }
}
