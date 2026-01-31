import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBoxDto {
  @IsString()
  @IsNotEmpty()
  barcode: string;

  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsDateString()
  importDate: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
