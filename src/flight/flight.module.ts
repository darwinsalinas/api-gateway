import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';

@Module({
  controllers: [FlightController]
})
export class FlightModule {}
