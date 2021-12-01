import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';

@Module({
  controllers: [PassengerController]
})
export class PassengerModule {}
