import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { MoveItemDto } from './dto/move-item.dto';

@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('boxes/:id/items')
  create(@Param('id') id: string, @Body() body: CreateItemDto) {
    return this.itemsService.create(Number(id), body);
  }

  @Patch('items/:id')
  update(@Param('id') id: string, @Body() body: UpdateItemDto) {
    return this.itemsService.update(Number(id), body);
  }

  @Post('items/:id/move')
  move(@Param('id') id: string, @Body() body: MoveItemDto) {
    return this.itemsService.move(Number(id), body);
  }

  @Delete('items/:id')
  remove(@Param('id') id: string) {
    return this.itemsService.softDelete(Number(id));
  }
}
