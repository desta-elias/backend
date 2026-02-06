import { IsNotEmpty, IsString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty() @IsString() name: string;
  @IsNotEmpty() @IsString() bed: string;
  @IsNotEmpty() @IsString() room: string;
  @IsNotEmpty() @IsString() condition: string;
  @IsNotEmpty() @IsInt() age: number;
  @IsNotEmpty() @IsString() gender: string;
  @IsNotEmpty() @IsString() admitted: string;
  @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) bedHeadPosition?: number;
  @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) bedLeftPosition?: number;
  @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) bedRightPosition?: number;
  @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) bedTiltPosition?: number;
}
