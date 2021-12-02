import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { UserMSG } from '../common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxySuperFlights,
    private readonly jwtService: JwtService,
  ) {}

  private clientProxyUser = this.clientProxy.clientProxyUsers();
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.clientProxyUser
      .send(UserMSG.VALID_USER, {
        username,
        password,
      })
      .toPromise();

    if (user) return user;

    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async signUp(userDto: UserDto) {
    return await this.clientProxyUser.send(UserMSG.CREATE, userDto).toPromise();
  }
}
