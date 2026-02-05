import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateBedPositionsDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  headPosition?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  rightTiltPosition?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  leftTiltPosition?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  legPosition?: number;
}
