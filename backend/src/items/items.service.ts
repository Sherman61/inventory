import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { MoveItemDto } from './dto/move-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(boxId: number, payload: CreateItemDto) {
    const item = await this.prisma.item.create({
      data: {
        boxId,
        name: payload.name,
        sku: payload.sku,
        quantity: payload.quantity,
        unit: payload.unit,
      },
    });
    await this.prisma.activityLog.create({
      data: {
        type: 'ITEM_ADDED',
        details: { itemId: item.id, boxId },
      },
    });
    return item;
  }

  async update(id: number, payload: UpdateItemDto) {
    const item = await this.prisma.item.update({
      where: { id },
      data: {
        name: payload.name,
        sku: payload.sku,
        quantity: payload.quantity,
        unit: payload.unit,
      },
    });
    await this.prisma.activityLog.create({
      data: {
        type: 'ITEM_UPDATED',
        details: { itemId: item.id },
      },
    });
    return item;
  }

  async move(id: number, payload: MoveItemDto) {
    const item = await this.prisma.item.findUnique({ where: { id } });
    if (!item || item.removedAt) {
      throw new NotFoundException('Item not found');
    }
    const quantityToMove = payload.quantity ?? item.quantity;
    if (quantityToMove >= item.quantity) {
      const moved = await this.prisma.item.update({
        where: { id },
        data: { boxId: payload.toBoxId },
      });
      await this.prisma.activityLog.create({
        data: {
          type: 'ITEM_MOVED',
          details: { itemId: moved.id, toBoxId: payload.toBoxId },
        },
      });
      return moved;
    }

    await this.prisma.item.update({
      where: { id },
      data: { quantity: item.quantity - quantityToMove },
    });

    const destination = await this.prisma.item.findFirst({
      where: {
        boxId: payload.toBoxId,
        name: item.name,
        sku: item.sku,
        unit: item.unit,
        removedAt: null,
      },
    });

    const moved = destination
      ? await this.prisma.item.update({
          where: { id: destination.id },
          data: { quantity: destination.quantity + quantityToMove },
        })
      : await this.prisma.item.create({
          data: {
            boxId: payload.toBoxId,
            name: item.name,
            sku: item.sku,
            quantity: quantityToMove,
            unit: item.unit,
          },
        });

    await this.prisma.activityLog.create({
      data: {
        type: 'ITEM_MOVED',
        details: {
          itemId: item.id,
          toBoxId: payload.toBoxId,
          quantity: quantityToMove,
        },
      },
    });

    return moved;
  }

  async softDelete(id: number) {
    const item = await this.prisma.item.update({
      where: { id },
      data: { removedAt: new Date() },
    });
    await this.prisma.activityLog.create({
      data: {
        type: 'ITEM_REMOVED',
        details: { itemId: item.id, boxId: item.boxId },
      },
    });
    return item;
  }
}
