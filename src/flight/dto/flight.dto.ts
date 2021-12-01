import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class FlightDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly pilot: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly airplane: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly destinationCity: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly flightDate: Date;
}
