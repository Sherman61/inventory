import { IsInt, IsOptional, Min } from 'class-validator';

export class MoveItemDto {
  @IsInt()
  @Min(1)
  toBoxId: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  quantity?: number;
}
