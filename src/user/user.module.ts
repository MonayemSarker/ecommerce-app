import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [PrismaModule, AuthModule, SessionModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
