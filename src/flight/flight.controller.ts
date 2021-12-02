import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FlightDto } from './dto/flight.dto';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { FlightMSG, PassengerMSG } from '../common/constants';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('flights')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/flights')
export class FlightController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private clientProxyFlight = this.clientProxy.clientProxyFlights();
  private clientProxyPassenger = this.clientProxy.clientProxyPassengers();

  @Post()
  create(@Body() flightDto: FlightDto): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightMSG.CREATE, flightDto);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    console.log('all flights');
    return this.clientProxyFlight.send(FlightMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightMSG.FIND_ONE, id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightMSG.DELETE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() flightDto: FlightDto,
  ): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightMSG.UPDATE, { id, flightDto });
  }

  @Post(':flightId/passenger/:passengerId')
  async createPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.clientProxyPassenger
      .send(PassengerMSG.FIND_ONE, passengerId)
      .toPromise();

    if (!passenger)
      throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);

    return this.clientProxyFlight.send(FlightMSG.ADD_PASSENGER, {
      flightId,
      passengerId,
    });
  }
}
