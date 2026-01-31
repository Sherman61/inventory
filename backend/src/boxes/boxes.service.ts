import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@Injectable()
export class BoxesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(params: {
    search?: string;
    location?: string;
    from?: string;
    to?: string;
  }) {
    const { search, location, from, to } = params;
    return this.prisma.box.findMany({
      where: {
        AND: [
          location ? { location } : {},
          from || to
            ? {
                importDate: {
                  gte: from ? new Date(from) : undefined,
                  lte: to ? new Date(to) : undefined,
                },
              }
            : {},
          search
            ? {
                OR: [
                  { label: { contains: search } },
                  { barcode: { contains: search } },
                  { items: { some: { name: { contains: search } } } },
                ],
              }
            : {},
        ],
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async create(payload: CreateBoxDto) {
    const box = await this.prisma.box.create({
      data: {
        barcode: payload.barcode,
        label: payload.label,
        location: payload.location,
        importDate: new Date(payload.importDate),
        notes: payload.notes,
      },
    });
    await this.prisma.activityLog.create({
      data: {
        type: 'BOX_CREATED',
        details: { boxId: box.id, barcode: box.barcode },
      },
    });
    return box;
  }

  async update(id: number, payload: UpdateBoxDto) {
    const box = await this.prisma.box.update({
      where: { id },
      data: {
        barcode: payload.barcode,
        label: payload.label,
        location: payload.location,
        importDate: payload.importDate ? new Date(payload.importDate) : undefined,
        notes: payload.notes,
      },
    });
    await this.prisma.activityLog.create({
      data: {
        type: 'BOX_UPDATED',
        details: { boxId: box.id },
      },
    });
    return box;
  }

  async get(id: number) {
    const box = await this.prisma.box.findUnique({
      where: { id },
      include: { items: { where: { removedAt: null } } },
    });
    if (!box) {
      throw new NotFoundException('Box not found');
    }
    return box;
  }

  async items(id: number) {
    const box = await this.prisma.box.findUnique({ where: { id } });
    if (!box) {
      throw new NotFoundException('Box not found');
    }
    return this.prisma.item.findMany({
      where: { boxId: id, removedAt: null },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
