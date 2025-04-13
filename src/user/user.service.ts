import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/user-login.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { AuthService } from 'src/auth/auth.service';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private sessionService: SessionService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async login(loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto.email, loginUserDto.password);
  }

  async validateSession(session_id: string) {
    return this.sessionService.getSession(session_id);
  }
}
