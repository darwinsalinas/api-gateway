import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { ProxyModule } from '../common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [FlightController],
})
export class FlightModule {}
