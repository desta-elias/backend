import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { BedDirection } from '../entities/bed.entity';

export class UpdateBedPositionsDto {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  headPosition?: number;

  @IsOptional()
  @IsEnum(BedDirection)
  headDirection?: BedDirection;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  rightTiltPosition?: number;

  @IsOptional()
  @IsEnum(BedDirection)
  rightTiltDirection?: BedDirection;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  leftTiltPosition?: number;

  @IsOptional()
  @IsEnum(BedDirection)
  leftTiltDirection?: BedDirection;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  legPosition?: number;

  @IsOptional()
  @IsEnum(BedDirection)
  legDirection?: BedDirection;
}
