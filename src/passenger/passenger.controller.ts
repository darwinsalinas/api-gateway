import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { PassengerDto } from './dto/passenger.dto';
import { Observable } from 'rxjs';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PassengerMSG } from '../common/constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('passengers')
@Controller('api/v2/passengers')
export class PassengerController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private clientProxyPassenger = this.clientProxy.clientProxyPassengers();

  @Post()
  create(@Body() passengerDto: PassengerDto): Observable<IPassenger> {
    return this.clientProxyPassenger.send(PassengerMSG.CREATE, passengerDto);
  }

  @Get()
  findAll(): Observable<IPassenger[]> {
    return this.clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IPassenger> {
    return this.clientProxyPassenger.send(PassengerMSG.FIND_ONE, id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<IPassenger> {
    return this.clientProxyPassenger.send(PassengerMSG.DELETE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() passengerDto: PassengerDto,
  ): Observable<IPassenger> {
    return this.clientProxyPassenger.send(PassengerMSG.UPDATE, {
      id,
      passengerDto,
    });
  }
}
