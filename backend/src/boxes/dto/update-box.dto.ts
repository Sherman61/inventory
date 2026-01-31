import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateBoxDto {
  @IsString()
  @IsOptional()
  barcode?: string;

  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsDateString()
  @IsOptional()
  importDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
