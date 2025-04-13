import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
// import {
//   ApiBearerAuth,
//   ApiOperation,
//   ApiResponse,
//   ApiTags,
// } from '@nestjs/swagger';
import { LoginUserDto } from './dto/user-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserSessionValidateDto } from './dto/user-session-validate.dto';

// @ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('JWT-auth')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('login')
  // @ApiOperation({ summary: 'User login' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Login successful',
  // })
  // @ApiResponse({
  //   status: 401,
  //   description: 'Unauthorized',
  // })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post('validate-session')
  async validateSession(@Body() body: UserSessionValidateDto) {
    return this.userService.validateSession(body.sessionId);
  }
}
