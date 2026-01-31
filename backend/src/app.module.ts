import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { BoxesModule } from './boxes/boxes.module';
import { ItemsModule } from './items/items.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [BoxesModule, ItemsModule, HealthModule],
  providers: [PrismaService],
})
export class AppModule {}
