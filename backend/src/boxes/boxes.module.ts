import { Module } from '@nestjs/common';
import { BoxesController } from './boxes.controller';
import { BoxesService } from './boxes.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BoxesController],
  providers: [BoxesService, PrismaService],
  exports: [BoxesService],
})
export class BoxesModule {}
